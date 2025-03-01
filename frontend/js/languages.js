/**
 * Comprehensive list of programming languages and frameworks
 * This is used when the API fails to load languages
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
  { name: "SQL", extension: "sql", hljs: "sql", popular: true, type: "language" },
  { name: "Shell/Bash", extension: "sh", hljs: "bash", popular: true, type: "language" },
  { name: "HTML", extension: "html", hljs: "html", popular: true, type: "language" },
  { name: "CSS", extension: "css", hljs: "css", popular: true, type: "language" },
  
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
  
  // Additional languages
  { name: "SCSS", extension: "scss", hljs: "scss", type: "language" },
  { name: "LESS", extension: "less", hljs: "less", type: "language" },
  { name: "Dart", extension: "dart", hljs: "dart", type: "language" },
  { name: "PowerShell", extension: "ps1", hljs: "powershell", type: "language" },
  { name: "R", extension: "r", hljs: "r", type: "language" },
  { name: "Perl", extension: "pl", hljs: "perl", type: "language" },
  { name: "Lua", extension: "lua", hljs: "lua", type: "language" },
  { name: "Groovy", extension: "groovy", hljs: "groovy", type: "language" },
  { name: "Scala", extension: "scala", hljs: "scala", type: "language" },
  { name: "Objective-C", extension: "m", hljs: "objectivec", type: "language" },
  { name: "Haskell", extension: "hs", hljs: "haskell", type: "language" },
  
  // Additional frameworks
  { name: "Svelte", extension: "svelte", hljs: "svelte", type: "framework", language: "JavaScript" },
  { name: "FastAPI", extension: "py", hljs: "python", type: "framework", language: "Python" },
  { name: "NestJS", extension: "ts", hljs: "typescript", type: "framework", language: "TypeScript" },
  { name: "Flutter", extension: "dart", hljs: "dart", type: "framework", language: "Dart" },
  { name: "Nuxt.js", extension: "vue", hljs: "vue", type: "framework", language: "JavaScript" },
  { name: "Gatsby", extension: "jsx", hljs: "jsx", type: "framework", language: "JavaScript" },
  { name: "Electron", extension: "js", hljs: "javascript", type: "framework", language: "JavaScript" },
  { name: "Symfony", extension: "php", hljs: "php", type: "framework", language: "PHP" },
  { name: "Phoenix", extension: "ex", hljs: "elixir", type: "framework", language: "Elixir" },
  { name: "Sails.js", extension: "js", hljs: "javascript", type: "framework", language: "JavaScript" },
  { name: "Koa", extension: "js", hljs: "javascript", type: "framework", language: "JavaScript" },
];

export default PROGRAMMING_LANGUAGES;
