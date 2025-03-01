const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

console.log(`${colors.bright}${colors.cyan}Setting up CodeForge AI...${colors.reset}\n`);

try {
  // Install root dependencies
  console.log(`${colors.yellow}Installing root dependencies...${colors.reset}`);
  execSync('npm install', { stdio: 'inherit' });
  
  // Install backend dependencies
  console.log(`\n${colors.yellow}Installing backend dependencies...${colors.reset}`);
  const backendPath = path.join(__dirname, 'backend');
  
  if (fs.existsSync(backendPath)) {
    process.chdir(backendPath);
    execSync('npm install', { stdio: 'inherit' });
    process.chdir(__dirname);
  } else {
    console.error(`${colors.red}Error: Backend directory not found at ${backendPath}${colors.reset}`);
    process.exit(1);
  }
  
  // Install frontend dependencies
  console.log(`\n${colors.yellow}Installing frontend dependencies...${colors.reset}`);
  const frontendPath = path.join(__dirname, 'frontend');
  
  if (fs.existsSync(frontendPath)) {
    process.chdir(frontendPath);
    execSync('npm install', { stdio: 'inherit' });
    process.chdir(__dirname);
  } else {
    console.error(`${colors.red}Error: Frontend directory not found at ${frontendPath}${colors.reset}`);
    process.exit(1);
  }
  
  console.log(`\n${colors.green}${colors.bright}Setup complete!${colors.reset}`);
  console.log(`\nYou can now start the application by running: ${colors.bright}npm start${colors.reset}`);
  console.log(`\n- Frontend will be available at: http://localhost:8080`);
  console.log(`- Backend will be available at: http://localhost:5000`);
  
} catch (error) {
  console.error(`\n${colors.red}Setup failed: ${error.message}${colors.reset}`);
  process.exit(1);
}
