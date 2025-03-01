/**
 * Comprehensive list of programming languages and frameworks
 * This can be used for both UI display and file extension mapping
 */
const PROGRAMMING_LANGUAGES = [
  // Programming Languages
  { name: "JavaScript", extension: "js", hljs: "javascript", popular: true, type: "language" },
  { name: "TypeScript", extension: "ts", hljs: "typescript", popular: true, type: "language" },
  { name: "Python", extension: "py", hljs: "python", popular: true, type: "language" },
  { name: "Java", extension: "java", hljs: "java", popular: true, type: "language" },
  { name: "C#", extension: "cs", hljs: "csharp", popular: true, type: "language" },
  { name: "C++", extension: "cpp", hljs: "cpp", popular: true, type: "language" },
  { name: "C", extension: "c", hljs: "c", popular: true, type: "language" },
  { name: "PHP", extension: "php", hljs: "php", popular: true, type: "language" },
  { name: "Ruby", extension: "rb", hljs: "ruby", popular: true, type: "language" },
  { name: "Go", extension: "go", hljs: "go", popular: true, type: "language" },
  { name: "Rust", extension: "rs", hljs: "rust", popular: true, type: "language" },
  { name: "Swift", extension: "swift", hljs: "swift", popular: true, type: "language" },
  { name: "Kotlin", extension: "kt", hljs: "kotlin", popular: true, type: "language" },
  { name: "Dart", extension: "dart", hljs: "dart", popular: true, type: "language" },
  { name: "HTML", extension: "html", hljs: "html", popular: true, type: "language" },
  { name: "CSS", extension: "css", hljs: "css", popular: true, type: "language" },
  { name: "SCSS", extension: "scss", hljs: "scss", type: "language" },
  { name: "SQL", extension: "sql", hljs: "sql", popular: true, type: "language" },
  { name: "Shell/Bash", extension: "sh", hljs: "bash", popular: true, type: "language" },
  { name: "PowerShell", extension: "ps1", hljs: "powershell", type: "language" },
  { name: "R", extension: "r", hljs: "r", type: "language" },
  { name: "Perl", extension: "pl", hljs: "perl", type: "language" },
  { name: "Scala", extension: "scala", hljs: "scala", type: "language" },
  { name: "Groovy", extension: "groovy", hljs: "groovy", type: "language" },
  { name: "Lua", extension: "lua", hljs: "lua", type: "language" },
  { name: "MATLAB", extension: "m", hljs: "matlab", type: "language" },
  { name: "Objective-C", extension: "m", hljs: "objectivec", type: "language" },
  { name: "Haskell", extension: "hs", hljs: "haskell", type: "language" },
  { name: "Clojure", extension: "clj", hljs: "clojure", type: "language" },
  { name: "Elixir", extension: "ex", hljs: "elixir", type: "language" },
  { name: "F#", extension: "fs", hljs: "fsharp", type: "language" },
  { name: "Julia", extension: "jl", hljs: "julia", type: "language" },
  { name: "Assembly", extension: "asm", hljs: "assembly", type: "language" },
  { name: "COBOL", extension: "cbl", hljs: "cobol", type: "language" },
  { name: "Fortran", extension: "f", hljs: "fortran", type: "language" },
  { name: "Delphi/Pascal", extension: "pas", hljs: "delphi", type: "language" },
  { name: "Lisp", extension: "lisp", hljs: "lisp", type: "language" },
  { name: "Crystal", extension: "cr", hljs: "crystal", type: "language" },
  { name: "Elm", extension: "elm", hljs: "elm", type: "language" },
  { name: "Erlang", extension: "erl", hljs: "erlang", type: "language" },
  { name: "Markdown", extension: "md", hljs: "markdown", type: "language" },
  { name: "JSON", extension: "json", hljs: "json", popular: true, type: "language" },
  { name: "YAML", extension: "yaml", hljs: "yaml", popular: true, type: "language" },
  { name: "XML", extension: "xml", hljs: "xml", type: "language" },
  { name: "GraphQL", extension: "graphql", hljs: "graphql", type: "language" },
  { name: "TOML", extension: "toml", hljs: "toml", type: "language" },
  { name: "Docker", extension: "dockerfile", hljs: "dockerfile", type: "language" },
  { name: "VB.NET", extension: "vb", hljs: "vbnet", type: "language" },
  { name: "WebAssembly", extension: "wasm", hljs: "wasm", type: "language" },
  { name: "Solidity", extension: "sol", hljs: "solidity", type: "language" },
  
  // Frameworks
  { name: "React", extension: "jsx", hljs: "jsx", popular: true, type: "framework", language: "JavaScript" },
  { name: "React Native", extension: "jsx", hljs: "jsx", popular: true, type: "framework", language: "JavaScript" },
  { name: "Angular", extension: "ts", hljs: "typescript", popular: true, type: "framework", language: "TypeScript" },
  { name: "Vue.js", extension: "vue", hljs: "vue", popular: true, type: "framework", language: "JavaScript" },
  { name: "Next.js", extension: "jsx", hljs: "jsx", popular: true, type: "framework", language: "JavaScript" },
  { name: "Express", extension: "js", hljs: "javascript", popular: true, type: "framework", language: "JavaScript" },
  { name: "Django", extension: "py", hljs: "python", popular: true, type: "framework", language: "Python" },
  { name: "Flask", extension: "py", hljs: "python", popular: true, type: "framework", language: "Python" },
  { name: "Spring Boot", extension: "java", hljs: "java", popular: true, type: "framework", language: "Java" },
  { name: "Ruby on Rails", extension: "rb", hljs: "ruby", popular: true, type: "framework", language: "Ruby" },
  { name: "Laravel", extension: "php", hljs: "php", popular: true, type: "framework", language: "PHP" },
  { name: "ASP.NET Core", extension: "cs", hljs: "csharp", popular: true, type: "framework", language: "C#" },
  { name: "Svelte", extension: "svelte", hljs: "svelte", popular: true, type: "framework", language: "JavaScript" },
  { name: "FastAPI", extension: "py", hljs: "python", popular: true, type: "framework", language: "Python" },
  { name: "NestJS", extension: "ts", hljs: "typescript", popular: true, type: "framework", language: "TypeScript" },
  { name: "Flutter", extension: "dart", hljs: "dart", popular: true, type: "framework", language: "Dart" },
  { name: "Nuxt.js", extension: "vue", hljs: "vue", type: "framework", language: "JavaScript" },
  { name: "Gatsby", extension: "jsx", hljs: "jsx", type: "framework", language: "JavaScript" },
  { name: "Electron", extension: "js", hljs: "javascript", type: "framework", language: "JavaScript" },
  { name: "Symfony", extension: "php", hljs: "php", type: "framework", language: "PHP" },
  { name: "Phoenix", extension: "ex", hljs: "elixir", type: "framework", language: "Elixir" },
  { name: "Blazor", extension: "cs", hljs: "csharp", type: "framework", language: "C#" },
  { name: "Sails.js", extension: "js", hljs: "javascript", type: "framework", language: "JavaScript" },
  { name: "Koa", extension: "js", hljs: "javascript", type: "framework", language: "JavaScript" },
  { name: "Ember.js", extension: "js", hljs: "javascript", type: "framework", language: "JavaScript" },
  { name: "Astro", extension: "astro", hljs: "javascript", type: "framework", language: "JavaScript" },
  { name: "TensorFlow", extension: "py", hljs: "python", type: "framework", language: "Python" },
  { name: "PyTorch", extension: "py", hljs: "python", type: "framework", language: "Python" },
  { name: "Pandas", extension: "py", hljs: "python", type: "framework", language: "Python" },
  { name: "Remix", extension: "jsx", hljs: "jsx", type: "framework", language: "JavaScript" },
];

// API endpoint to fetch languages
const getLanguages = (req, res) => {
  res.json({ languages: PROGRAMMING_LANGUAGES });
};

// Helper function to get file extension for a language
const getFileExtension = (languageName) => {
  const language = PROGRAMMING_LANGUAGES.find(
    (lang) => lang.name.toLowerCase() === languageName.toLowerCase()
  );
  return language ? language.extension : "txt";
};

// Helper function to get highlight.js language class
const getHljsLanguage = (languageName) => {
  const language = PROGRAMMING_LANGUAGES.find(
    (lang) => lang.name.toLowerCase() === languageName.toLowerCase()
  );
  return language ? language.hljs : "plaintext";
};

module.exports = {
  PROGRAMMING_LANGUAGES,
  getLanguages,
  getFileExtension,
  getHljsLanguage,
};
