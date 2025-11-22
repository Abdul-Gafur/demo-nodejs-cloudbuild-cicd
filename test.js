/**
 * Simple test suite for the DevFest Demo App
 * This is a basic test to demonstrate CI/CD testing
 */

const http = require('http');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';
const BASE_URL = `http://${HOST}:${PORT}`;

let testsPassed = 0;
let testsFailed = 0;

// Test helper function
function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    testsPassed++;
  } catch (error) {
    console.error(`❌ ${name}: ${error.message}`);
    testsFailed++;
  }
}

// HTTP request helper
function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}${path}`;
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Wait for server to be ready
function waitForServer(maxAttempts = 10) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const checkServer = () => {
      attempts++;
      makeRequest('/health')
        .then(() => resolve())
        .catch(() => {
          if (attempts >= maxAttempts) {
            reject(new Error('Server did not start in time'));
          } else {
            setTimeout(checkServer, 1000);
          }
        });
    };
    checkServer();
  });
}

// Run tests
async function runTests() {
  console.log('🧪 Starting tests...\n');

  // Wait for server (in real scenario, server would already be running)
  // For CI/CD, we'll test the code logic instead
  console.log('📝 Running unit tests...\n');

  // Test 1: Check if server.js exists and has required exports
  test('Server file structure', () => {
    const fs = require('fs');
    const serverContent = fs.readFileSync('./server.js', 'utf8');
    if (!serverContent.includes('express')) {
      throw new Error('Server does not use Express');
    }
    if (!serverContent.includes('app.listen')) {
      throw new Error('Server does not have listen method');
    }
  });

  // Test 2: Check package.json
  test('Package.json validation', () => {
    const fs = require('fs');
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    if (!packageJson.name) {
      throw new Error('Package.json missing name');
    }
    if (!packageJson.scripts || !packageJson.scripts.start) {
      throw new Error('Package.json missing start script');
    }
  });

  // Test 3: Check dependencies
  test('Dependencies check', () => {
    const fs = require('fs');
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    if (!packageJson.dependencies || !packageJson.dependencies.express) {
      throw new Error('Express dependency not found');
    }
  });

  // Test 4: Environment variables
  test('Environment variables', () => {
    // This test always passes, but demonstrates environment variable usage
    const port = process.env.PORT || 8080;
    if (typeof port !== 'string' && typeof port !== 'number') {
      throw new Error('PORT environment variable issue');
    }
  });

  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${testsPassed}`);
  console.log(`❌ Failed: ${testsFailed}`);
  console.log(`📈 Total: ${testsPassed + testsFailed}\n`);

  if (testsFailed > 0) {
    console.error('❌ Some tests failed!');
    process.exit(1);
  } else {
    console.log('✅ All tests passed!');
    process.exit(0);
  }
}

// Run tests
runTests().catch((error) => {
  console.error('Test runner error:', error);
  process.exit(1);
});

