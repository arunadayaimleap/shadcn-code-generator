const { spawn } = require('child_process');
const path = require('path');

// Start backend server
console.log('Starting backend server...');
const backend = spawn('node', ['server.js'], {
    cwd: path.join(__dirname, 'backend'),
    stdio: 'inherit'
});

// Start frontend server
console.log('Starting frontend server...');
const frontend = spawn('node', ['server.js'], {
    cwd: path.join(__dirname, 'frontend'),
    stdio: 'inherit'
});

console.log('\nServers started:');
console.log('- Frontend: http://localhost:8080');
console.log('- Backend: http://localhost:5000');
console.log('\nPress Ctrl+C to stop all servers.\n');

// Handle process termination
process.on('SIGINT', () => {
    console.log('Stopping servers...');
    backend.kill();
    frontend.kill();
    process.exit();
});

// Handle if a child process dies
backend.on('close', (code) => {
    if (code !== 0 && code !== null) {
        console.error(`Backend server exited with code ${code}`);
        frontend.kill();
        process.exit(1);
    }
});

frontend.on('close', (code) => {
    if (code !== 0 && code !== null) {
        console.error(`Frontend server exited with code ${code}`);
        backend.kill();
        process.exit(1);
    }
});
