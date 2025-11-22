const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Get version from environment or use default
const APP_VERSION = process.env.APP_VERSION || '1.0.0';
const BUILD_TIME = process.env.BUILD_TIME || new Date().toISOString();
const COMMIT_SHA = process.env.COMMIT_SHA || 'local';

// Middleware
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from DevFest Tamale 2025 test! 🎉',
    version: APP_VERSION,
    buildTime: BUILD_TIME,
    commitSha: COMMIT_SHA.substring(0, 7),
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// API info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    app: 'DevFest Demo App',
    version: APP_VERSION,
    environment: process.env.NODE_ENV || 'production',
    nodeVersion: process.version,
    platform: process.platform,
    buildInfo: {
      commitSha: COMMIT_SHA,
      buildTime: BUILD_TIME
    }
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📦 Version: ${APP_VERSION}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`ℹ️  API info: http://localhost:${PORT}/api/info`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});

