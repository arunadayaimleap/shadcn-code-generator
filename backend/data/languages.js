
/**
 * Comprehensive list of programming languages with their file extensions
 * This can be used for both UI display and file extension mapping
 */
const PROGRAMMING_LANGUAGES = [
  { name: "JavaScript", extension: "js", hljs: "javascript", popular: true },
  { name: "TypeScript", extension: "ts", hljs: "typescript", popular: true },
  { name: "Python", extension: "py", hljs: "python", popular: true },
  { name: "Java", extension: "java", hljs: "java", popular: true },
  { name: "C#", extension: "cs", hljs: "csharp", popular: true },
  { name: "C++", extension: "cpp", hljs: "cpp", popular: true },
  { name: "C", extension: "c", hljs: "c", popular: true },
  { name: "PHP", extension: "php", hljs: "php", popular: true },
  { name: "Ruby", extension: "rb", hljs: "ruby", popular: true },
  { name: "Go", extension: "go", hljs: "go", popular: true },
  { name: "Rust", extension: "rs", hljs: "rust", popular: true },
  { name: "Swift", extension: "swift", hljs: "swift", popular: true },
  { name: "Kotlin", extension: "kt", hljs: "kotlin", popular: true },
  { name: "Dart", extension: "dart", hljs: "dart", popular: true },
  { name: "HTML", extension: "html", hljs: "html", popular: true },
  { name: "CSS", extension: "css", hljs: "css", popular: true },
  { name: "SCSS", extension: "scss", hljs: "scss" },
  { name: "SQL", extension: "sql", hljs: "sql", popular: true },
  { name: "Shell/Bash", extension: "sh", hljs: "bash", popular: true },
  { name: "PowerShell", extension: "ps1", hljs: "powershell" },
  { name: "R", extension: "r", hljs: "r" },
  { name: "Perl", extension: "pl", hljs: "perl" },
  { name: "Scala", extension: "scala", hljs: "scala" },
  { name: "Groovy", extension: "groovy", hljs: "groovy" },
  { name: "Lua", extension: "lua", hljs: "lua" },
  { name: "MATLAB", extension: "m", hljs: "matlab" },
  { name: "Objective-C", extension: "m", hljs: "objectivec" },
  { name: "Haskell", extension: "hs", hljs: "haskell" },
  { name: "Clojure", extension: "clj", hljs: "clojure" },
  { name: "Elixir", extension: "ex", hljs: "elixir" },
  { name: "F#", extension: "fs", hljs: "fsharp" },
  { name: "Julia", extension: "jl", hljs: "julia" },
  { name: "Assembly", extension: "asm", hljs: "assembly" },
  { name: "COBOL", extension: "cbl", hljs: "cobol" },
  { name: "Fortran", extension: "f", hljs: "fortran" },
  { name: "Delphi/Pascal", extension: "pas", hljs: "delphi" },
  { name: "Lisp", extension: "lisp", hljs: "lisp" },
  { name: "Crystal", extension: "cr", hljs: "crystal" },
  { name: "Elm", extension: "elm", hljs: "elm" },
  { name: "Erlang", extension: "erl", hljs: "erlang" },
  { name: "Markdown", extension: "md", hljs: "markdown" },
  { name: "JSON", extension: "json", hljs: "json", popular: true },
  { name: "YAML", extension: "yaml", hljs: "yaml", popular: true },
  { name: "XML", extension: "xml", hljs: "xml" },
  { name: "GraphQL", extension: "graphql", hljs: "graphql" },
  { name: "TOML", extension: "toml", hljs: "toml" },
  { name: "Docker", extension: "dockerfile", hljs: "dockerfile" },
  { name: "VB.NET", extension: "vb", hljs: "vbnet" },
  { name: "WebAssembly", extension: "wasm", hljs: "wasm" },
  { name: "Solidity", extension: "sol", hljs: "solidity" },
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
