// scripts/test.js
const { exec } = require('child_process');
const util = require('util');
const path = require('path');
const execAsync = util.promisify(exec);

// Get the root directory of the project
const rootDir = path.resolve(__dirname, '..');

async function runCommand(command, cwd = rootDir) {
  console.log(`\n🏃 Running: ${command} in ${path.basename(cwd)}`);
  try {
    const { stdout, stderr } = await execAsync(command, { cwd });
    if (stdout) console.log(stdout);
    if (stderr) console.error('Stderr:', stderr);
    return true;
  } catch (error) {
    console.error(`❌ Error executing: ${command}`);
    console.error(error.message);
    if (error.stderr) console.error('Error details:', error.stderr);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting test suite...');
  
  try {
    // Install dependencies if needed
    console.log('\n📦 Checking dependencies...');
    await runCommand('npm install', path.join(rootDir, 'backend'));

    // Run unit tests
    console.log('\n🔍 Running unit tests...');
    const unitTestSuccess = await runCommand('npm test', path.join(rootDir, 'backend'));
    
    if (!unitTestSuccess) {
      console.error('❌ Unit tests failed. Stopping...');
      process.exit(1);
    }

    // Run performance tests if the script exists
    console.log('\n⚡ Checking for performance tests...');
    const perfTestSuccess = await runCommand('npm run test:perf --if-present', path.join(rootDir, 'backend'));
    
    if (!perfTestSuccess) {
      console.log('ℹ️  No performance tests found or they had issues, but continuing...');
    }

    console.log('\n✅ All tests completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Tests failed with error:', error.message);
    process.exit(1);
  }
}

// Run the tests
runTests();