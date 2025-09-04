#!/usr/bin/env node

/**
 * BLTP Backend Setup Script
 * Automates the setup process for the backend server
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up BLTP Backend...\n');

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 16) {
  console.error('❌ Node.js version 16 or higher is required');
  console.error(`   Current version: ${nodeVersion}`);
  process.exit(1);
}

console.log(`✅ Node.js version: ${nodeVersion}`);

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from template...');
  
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created');
  } else {
    // Create basic .env if template doesn't exist
    const envContent = `# BLTP Backend Environment Configuration
PORT=3001
NODE_ENV=development

# Get your Alpha Vantage API key from: https://www.alphavantage.co/support/#api-key
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key_here

# Get your Gemini AI API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created with default values');
  }
} else {
  console.log('✅ .env file already exists');
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
}

// Check if API keys are configured
console.log('\n🔑 Checking API key configuration...');

const envContent = fs.readFileSync(envPath, 'utf8');
const hasAlphaVantageKey = envContent.includes('ALPHA_VANTAGE_API_KEY=') && 
                          !envContent.includes('ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key_here');
const hasGeminiKey = envContent.includes('GEMINI_API_KEY=') && 
                    !envContent.includes('GEMINI_API_KEY=your_gemini_api_key_here');

if (!hasAlphaVantageKey) {
  console.log('⚠️  Alpha Vantage API key not configured');
  console.log('   Get your free API key from: https://www.alphavantage.co/support/#api-key');
  console.log('   Then update ALPHA_VANTAGE_API_KEY in your .env file');
}

if (!hasGeminiKey) {
  console.log('⚠️  Gemini AI API key not configured');
  console.log('   Get your API key from: https://makersuite.google.com/app/apikey');
  console.log('   Then update GEMINI_API_KEY in your .env file');
}

if (hasAlphaVantageKey && hasGeminiKey) {
  console.log('✅ All API keys are configured');
}

// Create logs directory
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
  console.log('✅ Logs directory created');
}

// Test server startup (dry run)
console.log('\n🧪 Testing server configuration...');
try {
  const testEnv = { ...process.env, NODE_ENV: 'test' };
  execSync('node -c server.js', { env: testEnv });
  console.log('✅ Server configuration is valid');
} catch (error) {
  console.error('❌ Server configuration error:', error.message);
  process.exit(1);
}

// Success message
console.log('\n🎉 BLTP Backend setup completed successfully!\n');

console.log('📋 Next Steps:');
console.log('1. Configure your API keys in the .env file:');
if (!hasAlphaVantageKey) {
  console.log('   - Add your Alpha Vantage API key');
}
if (!hasGeminiKey) {
  console.log('   - Add your Gemini AI API key');
}

console.log('\n2. Start the development server:');
console.log('   npm run dev');

console.log('\n3. Your backend will be available at:');
console.log('   - HTTP API: http://localhost:3001');
console.log('   - WebSocket: ws://localhost:3001');
console.log('   - Health Check: http://localhost:3001/api/health');

console.log('\n4. Connect your frontend to these endpoints');

console.log('\n📖 For complete documentation, see API_DOCS.md');
console.log('🆘 For support, check the troubleshooting section in the docs\n');

// Create a simple test script
const testScript = `// Quick API test
const axios = require('axios');

async function testAPI() {
  try {
    const response = await axios.get('http://localhost:3001/api/health');
    console.log('✅ Backend is running:', response.data);
  } catch (error) {
    console.log('❌ Backend not responding:', error.message);
    console.log('Make sure to run: npm run dev');
  }
}

testAPI();
`;

fs.writeFileSync(path.join(__dirname, 'test-connection.js'), testScript);
console.log('📝 Created test-connection.js for quick API testing');

// Final reminder about API keys
if (!hasAlphaVantageKey || !hasGeminiKey) {
  console.log('\n⚠️  IMPORTANT: Remember to configure your API keys in .env before starting the server!');
}
