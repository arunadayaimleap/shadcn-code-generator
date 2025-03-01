# CodeForge AI - Smart Code Generator

![Version](https://img.shields.io/badge/version-1.3.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

CodeForge AI is a powerful code generation tool that utilizes OpenAI's GPT models to create high-quality, production-ready code across 50+ programming languages. This application features a user-friendly interface and advanced AI capabilities to help developers accelerate their coding workflow.

## 🚀 Features

- **Multi-language Support**: Generate code in 50+ programming languages including JavaScript, Python, TypeScript, Java, C#, and more.
- **AI Model Selection**: Choose from various OpenAI models to optimize for your specific needs.
- **Project Context Awareness**: Upload project files to provide context for more accurate code generation.
- **Unit Test Generation**: Option to automatically generate unit tests for your code.
- **Syntax Highlighting**: Real-time syntax highlighting for better code readability.
- **Code Quality Assurance**: Automatic linting and best practices enforcement.
- **One-click Download**: Easily download your generated code files.
- **Searchable Language Selection**: Quickly find and select your preferred programming language.

## 📋 Requirements

- Node.js 14.x or higher
- NPM or Yarn
- OpenAI API key

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shadcn-code-generator.git
   cd shadcn-code-generator
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the backend directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   PORT=5000
   CORS_ORIGIN=http://localhost
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```

5. **Set up the frontend**
   Open a new terminal window:
   ```bash
   cd ../frontend
   # If using a simple HTTP server like http-server:
   npx http-server -p 8080
   ```

6. **Access the application**
   Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## 🖥️ Usage

1. **Select a programming language** from the dropdown or search for a specific language.
2. **Choose an AI model** based on your needs (more powerful models generally produce better code).
3. **Describe the code** you want to generate in the prompt field.
4. **Optional**: Upload a file containing project context or coding standards.
5. **Optional**: Check "Include Unit Tests" to generate tests for your code.
6. **Click "Generate Code"** and wait for the AI to create your code.
7. **Review the generated code** and download it if satisfied.

## 🏗️ Project Structure

```
shadcn-code-generator/
├── backend/                # Backend Node.js server
│   ├── data/
│   │   └── languages.js    # Programming languages configuration
│   ├── generated_code/     # Storage for generated code files
│   ├── uploads/            # Temporary storage for uploaded project files
│   └── server.js           # Express server and API endpoints
├── frontend/               # Frontend web interface
│   ├── index.html          # Main application page
│   └── js/                 # JavaScript modules
│       └── languages.js    # Frontend language definitions (fallback)
├── .gitignore              # Git ignore configuration
└── README.md               # Project documentation
```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/languages` | GET | Retrieve the list of available programming languages |
| `/api/models` | GET | Retrieve the list of available OpenAI models |
| `/api/upload-project-file` | POST | Upload a project file for context |
| `/api/generate-code` | POST | Generate code with the specified parameters |
| `/api/download-code` | GET | Download a generated code file |
| `/api/health` | GET | Check if the server is running properly |

## 🛠️ Advanced Configuration

### Adding New Languages

You can add more programming languages by editing the `backend/data/languages.js` file:

```javascript
// Add your new language
{ 
  name: "YourLanguage",
  extension: "yl",
  hljs: "yourlanguage",
  popular: false 
}
```

### Model Filtering

By default, the system filters for GPT-4, GPT-3.5-turbo, and Codex models. To change this, modify the filter in `server.js`:

```javascript
const codeModels = response.data.filter(model => 
    model.id.includes('your-model-filter')
);
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [OpenAI](https://openai.com/) for providing the GPT models
- [Bootstrap](https://getbootstrap.com/) for the frontend framework
- [Highlight.js](https://highlightjs.org/) for the code syntax highlighting
