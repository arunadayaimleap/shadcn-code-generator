
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const codeGeneratorForm = document.getElementById('codeGeneratorForm');
    const generateButton = document.getElementById('generateButton');
    const generateSpinner = document.getElementById('generateSpinner');
    const codeOutput = document.getElementById('codeOutput');
    const languageBadge = document.getElementById('languageBadge');
    const languageSelect = document.getElementById('languageSelect');
    const languageDisplay = document.getElementById('languageDisplay');
    const languageList = document.getElementById('languageList');
    const modelSelect = document.getElementById('modelSelect');
    const codeFilename = document.getElementById('codeFilename');
    const downloadCard = document.getElementById('downloadCard');
    const downloadLink = document.getElementById('downloadLink');
    const folderStructureSection = document.getElementById('folderStructureSection');
    const folderStructure = document.getElementById('folderStructure');
    const serverStatusAlert = document.getElementById('serverStatusAlert');
    
    // API Base URL
    const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:5000/api' 
        : '/api'; // For production deployment
    
    // Store languages data
    let languages = [];

    // Initialize
    checkServerStatus().then(isConnected => {
        // Only fetch models and languages if connected
        if (isConnected) {
            fetchAvailableLanguages();
            fetchAvailableModels();
        }
    });

    // Language selection functionality
    languageDisplay.addEventListener('focus', function() {
        languageList.classList.add('show');
    });
    
    languageDisplay.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterLanguageList(searchTerm);
    });
    
    document.addEventListener('click', function(e) {
        if (!languageDisplay.contains(e.target) && !languageList.contains(e.target)) {
            languageList.classList.remove('show');
        }
    });
    
    // Form submission
    codeGeneratorForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const promptInput = document.getElementById('promptInput').value;
        const language = languageSelect.value;
        const model = modelSelect.value;
        const includeTests = document.getElementById('includeTests').checked;
        const projectFile = document.getElementById('projectFile').files[0];
        
        // Validate form inputs
        if (!promptInput) {
            alert('Please enter a prompt for code generation.');
            return;
        }
        
        if (!language) {
            alert('Please select a programming language.');
            return;
        }
        
        if (!model) {
            alert('Please select an AI model.');
            return;
        }
        
        // Show loading state
        generateButton.disabled = true;
        generateSpinner.classList.remove('hidden');
        codeOutput.textContent = 'Generating your code...';
        
        try {
            let projectFileContent = null;
            
            // Upload project file if provided (optional)
            if (projectFile) {
                const formData = new FormData();
                formData.append('projectFile', projectFile);
                
                const uploadResponse = await fetch(`${API_BASE_URL}/upload-project-file`, {
                    method: 'POST',
                    body: formData
                });
                
                if (!uploadResponse.ok) {
                    throw new Error('Failed to upload project file');
                }
                
                const uploadData = await uploadResponse.json();
                projectFileContent = uploadData.fileContent;
            }
            
            // Generate code
            const response = await fetch(`${API_BASE_URL}/generate-code`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: promptInput,
                    language: language,
                    model: model,
                    includeTests: includeTests,
                    projectFile: projectFileContent
                })
            });
            
            if (!response.ok) {
                throw new Error('Code generation failed');
            }
            
            const data = await response.json();
            
            // Update UI with the generated code
            codeOutput.textContent = data.code;
            codeOutput.className = 'language-' + language.toLowerCase();
            hljs.highlightElement(codeOutput);
            
            // Update file name
            codeFilename.textContent = data.filename;
            
            // Show download button
            downloadCard.style.display = 'block';
            downloadLink.href = `${API_BASE_URL}/download-code?filename=${data.filename}`;
            
            // Show folder structure if available
            if (data.folderStructure) {
                folderStructureSection.style.display = 'block';
                folderStructure.textContent = JSON.stringify(data.folderStructure, null, 2);
            }
            
        } catch (error) {
            codeOutput.textContent = `Error: ${error.message}`;
        } finally {
            // Reset loading state
            generateButton.disabled = false;
            generateSpinner.classList.add('hidden');
        }
    });

    // Helper Functions
    function selectLanguage(name, hljs, extension) {
        languageSelect.value = name;
        languageDisplay.value = name;
        languageBadge.textContent = hljs;
        codeOutput.className = 'language-' + hljs;
        codeFilename.textContent = `output.${extension}`;
        hljs.highlightElement(codeOutput);
        languageList.classList.remove('show');
    }
    
    function filterLanguageList(searchTerm) {
        const items = languageList.querySelectorAll('.language-item');
        let hasMatches = false;
        
        items.forEach(item => {
            // Case-insensitive search
            const langName = item.textContent.toLowerCase();
            if (langName.includes(searchTerm)) {
                item.style.display = 'block';
                hasMatches = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show or hide the language list based on matches
        if (hasMatches) {
            languageList.classList.add('show');
        } else {
            languageList.classList.remove('show');
        }
        
        // Adjust category display
        const categories = languageList.querySelectorAll('.language-category');
        categories.forEach(category => {
            const nextItems = [];
            let sibling = category.nextElementSibling;
            
            while (sibling && !sibling.classList.contains('language-category')) {
                nextItems.push(sibling);
                sibling = sibling.nextElementSibling;
            }
            
            const hasVisibleItems = nextItems.some(item => item.style.display !== 'none');
            category.style.display = hasVisibleItems ? 'block' : 'none';
        });
    }

    function updateLanguageDisplay(language) {
        const selectedLanguage = languages.find(lang => 
            lang.name.toLowerCase() === language.toLowerCase()
        );
        if (selectedLanguage) {
            languageBadge.textContent = selectedLanguage.hljs;
            codeOutput.className = 'language-' + selectedLanguage.hljs;
            codeFilename.textContent = `output.${selectedLanguage.extension}`;
            hljs.highlightElement(codeOutput);
        }
    }

    // API Functions
    async function checkServerStatus() {
        try {
            const response = await fetch(`${API_BASE_URL}/health`);
            
            if (response.ok) {
                const data = await response.json();
                serverStatusAlert.className = 'alert alert-success mb-4';
                serverStatusAlert.innerHTML = `
                    <div class="d-flex align-items-center justify-content-between">
                        <div>
                            <i class="fas fa-check-circle me-2"></i>
                            Server connected successfully (v${data.version})
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
                
                // Automatically hide the alert after 5 seconds
                setTimeout(() => {
                    serverStatusAlert.style.display = 'none';
                }, 5000);
                
                return true;
            } else {
                throw new Error('Server health check failed');
            }
        } catch (error) {
            serverStatusAlert.className = 'alert alert-danger mb-4';
            serverStatusAlert.innerHTML = `
                <div class="d-flex align-items-center">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    <div>
                        <strong>Cannot connect to server.</strong> 
                        <span>Please make sure the backend server is running at ${API_BASE_URL}</span>
                        <div class="mt-2">
                            <button class="btn btn-sm btn-outline-danger" onclick="checkServerStatus()">
                                <i class="fas fa-sync-alt me-1"></i> Try again
                            </button>
                        </div>
                    </div>
                </div>
            `;
            return false;
        }
    }
    
    async function fetchAvailableLanguages() {
        try {
            const response = await fetch(`${API_BASE_URL}/languages`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch languages');
            }
            
            const data = await response.json();
            languages = data.languages;
            
            // Populate the language list
            populateLanguageList(languages);
            
            // Set default language (JavaScript)
            const defaultLanguage = languages.find(lang => lang.name === 'JavaScript');
            if (defaultLanguage) {
                selectLanguage(defaultLanguage.name, defaultLanguage.hljs, defaultLanguage.extension);
            }
            
        } catch (error) {
            console.error('Error fetching languages:', error);
            // Use fallback languages
            loadFallbackLanguages();
        }
    }
    
    async function fetchAvailableModels() {
        try {
            const response = await fetch(`${API_BASE_URL}/models`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch models');
            }
            
            const data = await response.json();
            
            // Clear the loading option
            modelSelect.innerHTML = '';
            
            if (data.models && data.models.length > 0) {
                // Add models to the dropdown
                data.models.forEach(model => {
                    const option = document.createElement('option');
                    option.value = model.id;
                    option.textContent = model.id;
                    modelSelect.appendChild(option);
                });
                
                // Set default to gpt-4-turbo if available, or the first model
                const defaultModel = data.models.find(m => m.id === 'gpt-4-turbo') || data.models[0];
                modelSelect.value = defaultModel.id;
            } else {
                // If no models are available, provide a default option
                const option = document.createElement('option');
                option.value = 'gpt-4-turbo';
                option.textContent = 'gpt-4-turbo (Default)';
                modelSelect.appendChild(option);
            }
        } catch (error) {
            console.error('Error fetching models:', error);
            
            // Set some default options in case of error
            modelSelect.innerHTML = `
                <option value="gpt-4-turbo">gpt-4-turbo (Default)</option>
                <option value="gpt-4">gpt-4</option>
                <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
            `;
        }
    }

    function loadFallbackLanguages() {
        // Hardcoded fallback languages
        const basicLanguages = [
            { name: "JavaScript", hljs: "javascript", extension: "js", type: "language", popular: true },
            { name: "TypeScript", hljs: "typescript", extension: "ts", type: "language", popular: true },
            { name: "Python", hljs: "python", extension: "py", type: "language", popular: true },
            { name: "Java", hljs: "java", extension: "java", type: "language", popular: true },
            { name: "C#", hljs: "csharp", extension: "cs", type: "language", popular: true },
            { name: "HTML", hljs: "html", extension: "html", type: "language", popular: true },
            { name: "CSS", hljs: "css", extension: "css", type: "language", popular: true },
            { name: "React", hljs: "jsx", extension: "jsx", type: "framework", popular: true, language: "JavaScript" },
            { name: "Angular", hljs: "typescript", extension: "ts", type: "framework", popular: true, language: "TypeScript" },
            { name: "Express", hljs: "javascript", extension: "js", type: "framework", popular: true, language: "JavaScript" }
        ];
        
        languages = basicLanguages;
        populateLanguageList(basicLanguages);
        
        // Set default language
        const defaultLanguage = languages.find(lang => lang.name === 'JavaScript');
        if (defaultLanguage) {
            selectLanguage(defaultLanguage.name, defaultLanguage.hljs, defaultLanguage.extension);
        }
    }
    
    function populateLanguageList(languages) {
        // Clear existing list
        languageList.innerHTML = '';
        
        // Add popular languages first
        if (languages.some(lang => lang.popular && lang.type === "language")) {
            const popularLangCategory = document.createElement('div');
            popularLangCategory.className = 'language-category';
            popularLangCategory.textContent = 'Popular Languages';
            languageList.appendChild(popularLangCategory);
            
            languages.filter(lang => lang.popular && lang.type === "language").forEach(lang => {
                addLanguageToList(lang, true);
            });
        }
        
        // Add popular frameworks
        if (languages.some(lang => lang.popular && lang.type === "framework")) {
            const popularFrameworkCategory = document.createElement('div');
            popularFrameworkCategory.className = 'language-category';
            popularFrameworkCategory.textContent = 'Popular Frameworks';
            languageList.appendChild(popularFrameworkCategory);
            
            languages.filter(lang => lang.popular && lang.type === "framework").forEach(lang => {
                addLanguageToList(lang, true);
            });
        }
        
        // Add "All Languages" category
        if (languages.some(lang => lang.type === "language")) {
            const allLangCategory = document.createElement('div');
            allLangCategory.className = 'language-category';
            allLangCategory.textContent = 'All Languages';
            languageList.appendChild(allLangCategory);
            
            // Add all languages
            languages.filter(lang => lang.type === "language").forEach(lang => {
                addLanguageToList(lang, lang.popular);
            });
        }
        
        // Add "All Frameworks" category
        if (languages.some(lang => lang.type === "framework")) {
            const allFrameworkCategory = document.createElement('div');
            allFrameworkCategory.className = 'language-category';
            allFrameworkCategory.textContent = 'All Frameworks';
            languageList.appendChild(allFrameworkCategory);
            
            // Add all frameworks
            languages.filter(lang => lang.type === "framework").forEach(lang => {
                addLanguageToList(lang, lang.popular);
            });
        }
    }
    
    function addLanguageToList(language, skipIfPopular) {
        // Skip if this is in the "All" section and the item is already in "Popular"
        if (skipIfPopular && language.popular) return;
        
        const item = document.createElement('div');
        item.className = 'language-item';
        if (language.popular) item.classList.add('popular');
        if (language.type === "framework") item.classList.add('framework');
        
        item.textContent = language.name;
        item.setAttribute('data-hljs', language.hljs);
        item.setAttribute('data-extension', language.extension);
        item.setAttribute('data-type', language.type);
        
        item.addEventListener('click', function() {
            selectLanguage(language.name, language.hljs, language.extension);
        });
        
        languageList.appendChild(item);
    }
    
    // Make checkServerStatus available globally for the retry button
    window.checkServerStatus = checkServerStatus;
    
    // Initialize syntax highlighting
    hljs.highlightElement(codeOutput);
});
