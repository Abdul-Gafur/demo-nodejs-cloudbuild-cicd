# Deployment Guide for Sample Application

This guide explains how to deploy the sample application using Google Cloud Build CI/CD pipeline.

## 📋 Prerequisites

1. Google Cloud Platform account with billing enabled
2. `gcloud` CLI installed and configured
3. GitHub account
4. VM instance created (see main setup guide)

## 🚀 Quick Deployment Steps

### 1. Push to GitHub

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: DevFest demo app"

# Add GitHub remote
git remote add origin https://github.com/yourusername/yourrepo.git

# Push to GitHub
git push -u origin main
```

### 2. Connect to Cloud Source Repositories

Follow the main setup guide to connect your GitHub repository to Cloud Source Repositories.

### 3. Create Cloud Build Trigger

1. Go to [Cloud Build > Triggers](https://console.cloud.google.com/cloud-build/triggers)
2. Click **"Create Trigger"**
3. Configure:
   - **Name**: `deploy-on-push`
   - **Event**: `Push to a branch`
   - **Branch**: `^main$`
   - **Configuration**: `Cloud Build configuration file (yaml or json)`
   - **File**: `cloudbuild.yaml`

### 4. Test the Pipeline

Make a small change to the code:

```bash
# Edit server.js - change the message
# Then commit and push
git add .
git commit -m "Test CI/CD pipeline"
git push origin main
```

Watch the build in Cloud Build console!

## 🔧 Configuration

### Update cloudbuild.yaml Substitutions

Edit `cloudbuild.yaml` and update these values:

```yaml
substitutions:
  _VM_NAME: 'your-vm-name'        # Your VM instance name
  _ZONE: 'us-central1-a'          # Your VM zone
  _APP_DIR: '/var/www/my-app'     # Application directory on VM
  _SERVICE_NAME: 'my-app'        # Service name for PM2/systemd
```

### VM Setup

Before deploying, ensure your VM has:

1. **Node.js installed:**
   ```bash
   sudo apt-get update
   sudo apt-get install -y nodejs npm
   ```

2. **PM2 installed:**
   ```bash
   sudo npm install -g pm2
   ```

3. **Application directory:**
   ```bash
   sudo mkdir -p /var/www/my-app
   sudo chown $USER:$USER /var/www/my-app
   ```

## 🧪 Testing Locally

Before deploying, test locally:

```bash
# Install dependencies
npm install

# Run tests
npm test

# Start server
npm start

# Test endpoints
curl http://localhost:8080
curl http://localhost:8080/health
curl http://localhost:8080/api/info
```

## 📊 Monitoring

### Check Build Status

```bash
# List recent builds
gcloud builds list --limit=5

# View build logs
gcloud builds log BUILD_ID
```

### Check Application on VM

```bash
# SSH into VM
gcloud compute ssh demo-vm --zone=us-central1-a

# Check PM2 status
pm2 list
pm2 logs my-app

# Test application
curl http://localhost:8080
```

## 🐛 Troubleshooting

### Build Fails

1. Check build logs in Cloud Build console
2. Verify all dependencies are in `package.json`
3. Ensure `cloudbuild.yaml` is in repository root

### Application Not Starting on VM

1. SSH into VM
2. Check PM2: `pm2 list`
3. Check logs: `pm2 logs my-app`
4. Verify Node.js is installed: `node --version`
5. Check application directory: `ls -la /var/www/my-app`

### Permission Issues

```bash
# Fix directory permissions
sudo chown -R $USER:$USER /var/www/my-app

# Ensure PM2 can access the directory
chmod -R 755 /var/www/my-app
```

## 🔄 Updating the Application

To update the application:

1. Make changes to your code
2. Commit and push to GitHub
3. Cloud Build automatically:
   - Builds the new version
   - Deploys to VM
   - Restarts the application

## 📝 Environment Variables

You can set environment variables in the deployment step:

```yaml
# In cloudbuild.yaml, add to deploy step:
env:
  - 'APP_VERSION=${SHORT_SHA}'
  - 'BUILD_TIME=${BUILD_TIMESTAMP}'
  - 'COMMIT_SHA=${COMMIT_SHA}'
```

Then update the VM deployment command to include these:

```bash
pm2 start ${_APP_DIR}/server.js --name ${_SERVICE_NAME} \
  --update-env \
  --env APP_VERSION=${SHORT_SHA} \
  --env BUILD_TIME=${BUILD_TIMESTAMP} \
  --env COMMIT_SHA=${COMMIT_SHA}
```

## 🎯 Next Steps

1. Add more API endpoints
2. Add database integration
3. Implement authentication
4. Add monitoring and logging
5. Set up staging environment

---

**Happy Deploying! 🚀**

