const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
require('dotenv').config();

// Import language data
const { getLanguages, getFileExtension } = require("./data/languages");

// Validate essential environment variables
if (!process.env.OPENAI_API_KEY) {
    console.error("Error: OPENAI_API_KEY environment variable is required");
    process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Constants
const PORT = process.env.PORT || 5000;
const GENERATED_CODE_FOLDER = path.join(__dirname, "generated_code");
const UPLOADS_FOLDER = path.join(__dirname, "uploads");

// Ensure required directories exist
if (!fs.existsSync(GENERATED_CODE_FOLDER)) {
    fs.mkdirSync(GENERATED_CODE_FOLDER, { recursive: true });
}
if (!fs.existsSync(UPLOADS_FOLDER)) {
    fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
}

// Configure file upload middleware
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, UPLOADS_FOLDER);
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Express app setup
const app = express();

// Middleware
app.use(express.json());
app.use(helmet()); // Adds security-related HTTP headers
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*', // Ideally, set this to your frontend domain
    methods: ['GET', 'POST']
}));
app.use(morgan('tiny')); // HTTP request logger

// API to get available programming languages
app.get("/api/languages", getLanguages);

// API to get available OpenAI models
app.get("/api/models", async (req, res, next) => {
    try {
        const response = await openai.models.list();
        
        // Filter for models that are suitable for code generation
        // This is a basic filter - you may want to refine based on your needs
        const codeModels = response.data.filter(model => 
            model.id.includes('gpt-4') || 
            model.id.includes('gpt-3.5-turbo') || 
            model.id.includes('codex')
        );
        
        res.json({ models: codeModels });
    } catch (error) {
        next(error);
    }
});

// API to upload project structure file (optional)
app.post("/api/upload-project-file", upload.single("projectFile"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const fileContent = fs.readFileSync(req.file.path, 'utf8');
        res.json({
            success: true,
            fileContent,
            filePath: req.file.path,
            message: 'Project file uploaded successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'File upload failed', details: error.message });
    }
});

// API to generate, save, and auto-correct AI-generated code
app.post("/api/generate-code", async (req, res, next) => {
    const { prompt, language, includeTests, projectFile, model } = req.body;

    if (!prompt || !language) {
        return res.status(400).json({ error: "Prompt and language are required" });
    }

    try {
        let systemPrompt = `You are an AI code generator. Generate high-quality ${language} code following best practices and proper formatting.`;
        
        // If project file content is provided, include it in the system prompt
        if (projectFile) {
            systemPrompt += ` Follow the project structure and guidelines specified here: ${projectFile}`;
        }
        
        let messages = [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt }
        ];

        if (includeTests) {
            messages.push({ role: "user", content: "Also generate unit tests for this code." });
        }

        // Use the specified model or default to gpt-4-turbo
        const selectedModel = model || "gpt-4-turbo";

        const response = await openai.chat.completions.create({
            model: selectedModel,
            messages: messages,
            max_tokens: 2000
        });

        let generatedCode = response.choices[0].message.content.trim();

        // Auto-fix any linting issues
        const fixedCode = await fixLintingIssues(generatedCode, language, selectedModel);

        // Use the imported getFileExtension function
        const filename = `generated_${Date.now()}.${getFileExtension(language)}`;
        const filePath = path.join(GENERATED_CODE_FOLDER, filename);

        fs.writeFileSync(filePath, fixedCode);

        res.json({ code: fixedCode, filename });
    } catch (error) {
        next(error); // Pass to error handling middleware
    }
});

// API to download generated code files
app.get("/api/download-code", (req, res, next) => {
    const { filename } = req.query;

    if (!filename) {
        return res.status(400).json({ error: "Filename is required" });
    }

    const filePath = path.join(GENERATED_CODE_FOLDER, filename);

    try {
        if (fs.existsSync(filePath)) {
            res.download(filePath);
        } else {
            res.status(404).json({ error: "File not found" });
        }
    } catch (error) {
        next(error);
    }
});

// Function to auto-fix linting issues using AI
async function fixLintingIssues(code, language, model = "gpt-4-turbo") {
    try {
        const response = await openai.chat.completions.create({
            model: model,
            messages: [
                { role: "system", content: `You are an AI code fixer. Ensure the following ${language} code follows best practices and corrects any linting issues.` },
                { role: "user", content: code }
            ],
            max_tokens: 2000
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error fixing linting issues:", error);
        return code;
    }
}

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.json({ 
        status: "ok", 
        version: "1.3.0",
        timestamp: new Date().toISOString() 
    });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ error: message });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
