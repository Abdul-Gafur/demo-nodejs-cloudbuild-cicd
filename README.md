# DevFest Tamale 2025 - Sample Application

This is a simple Node.js application created for the **Fundamentals of DevOps: Building a CI/CD Pipeline with Google Cloud Build** session at DevFest Tamale 2025.

## 🎯 Purpose

This sample application demonstrates:
- A simple Express.js web server
- Basic API endpoints
- Health check endpoint
- CI/CD pipeline integration
- Automated testing

## 📋 Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Application

```bash
npm start
```

The server will start on `http://localhost:8080`

### 3. Test the Application

```bash
# Run tests
npm test

# Or test manually
curl http://localhost:8080
curl http://localhost:8080/health
curl http://localhost:8080/api/info
```

## 📡 API Endpoints

### GET `/`
Returns a welcome message with app information.

**Response:**
```json
{
  "message": "Hello from DevFest Tamale 2025! 🎉",
  "version": "1.0.0",
  "buildTime": "2025-01-XX...",
  "commitSha": "abc1234",
  "status": "running",
  "timestamp": "2025-01-XX..."
}
```

### GET `/health`
Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "healthy",
  "uptime": 123.45,
  "timestamp": "2025-01-XX..."
}
```

### GET `/api/info`
Returns detailed application information.

**Response:**
```json
{
  "app": "DevFest Demo App",
  "version": "1.0.0",
  "environment": "production",
  "nodeVersion": "v16.x.x",
  "platform": "linux",
  "buildInfo": {
    "commitSha": "abc1234...",
    "buildTime": "2025-01-XX..."
  }
}
```

## 🧪 Testing

The application includes a simple test suite:

```bash
npm test
```

Tests check:
- Server file structure
- Package.json validation
- Dependencies
- Environment variables

## 🏗️ Build

The build process prepares the application for deployment:

```bash
npm run build
```

This creates a `dist/` directory with the application files ready for deployment.

## 🔧 Environment Variables

You can configure the application using environment variables:

- `PORT` - Server port (default: 8080)
- `APP_VERSION` - Application version
- `BUILD_TIME` - Build timestamp
- `COMMIT_SHA` - Git commit SHA
- `NODE_ENV` - Environment (development/production)

## 📦 Project Structure

```
sample-app/
├── server.js          # Main application file
├── test.js            # Test suite
├── package.json       # Dependencies and scripts
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## 🚢 Deployment

This application is designed to be deployed using Google Cloud Build CI/CD pipeline:

1. Push code to GitHub
2. Cloud Build automatically:
   - Installs dependencies
   - Runs tests
   - Builds the application
   - Deploys to VM

See the main session materials for deployment instructions.

## 🎓 Learning Objectives

After working with this application, you'll understand:
- How to structure a simple Node.js application
- How to create API endpoints
- How to write basic tests
- How CI/CD pipelines work
- How to deploy applications automatically

## 📝 Notes

- This is a **demo application** for learning purposes
- It's intentionally simple to focus on CI/CD concepts
- Production applications would be more complex
- Always add proper error handling and security in production

## 🤝 Contributing

This is a sample project for DevFest Tamale 2025. Feel free to:
- Modify it for your own learning
- Add more features
- Experiment with different configurations

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Cloud Build Documentation](https://cloud.google.com/build/docs)

## 📄 License

MIT License - Feel free to use this for learning and demonstrations.

---

**Happy Learning! 🚀**

*Created for DevFest Tamale 2025*

