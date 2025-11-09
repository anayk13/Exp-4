# Jenkins Setup Guide for React Selenium Testing

This guide provides detailed step-by-step instructions for setting up Jenkins to run automated tests for the React application.

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- ✅ Jenkins installed and running (access at http://localhost:8080)
- ✅ Node.js 16+ installed on the Jenkins server
- ✅ Chrome browser installed on the Jenkins server
- ✅ Git installed on the Jenkins server
- ✅ Access to your Git repository

## 🔧 Step-by-Step Jenkins Configuration

### Part 1: Jenkins Plugin Installation

1. **Open Jenkins Dashboard**
   - Navigate to http://localhost:8080
   - Log in with your credentials

2. **Install Required Plugins**
   - Click **Manage Jenkins** in the left sidebar
   - Click **Manage Plugins**
   - Go to **Available** tab
   - Search and install:
     - [ ] NodeJS Plugin
     - [ ] Git Plugin
     - [ ] Pipeline Plugin
     - [ ] Pipeline: Stage View Plugin (optional, for better visualization)
   - Click **Install without restart**
   - Wait for installation to complete

### Part 2: Global Tool Configuration

1. **Configure NodeJS**
   - Go to **Manage Jenkins** → **Global Tool Configuration**
   - Scroll to **NodeJS** section
   - Click **Add NodeJS**
   - Configure:
     ```
     Name: NodeJS 16
     Install automatically: ✓ (checked)
     Version: Select NodeJS 16.x or higher
     ```
   - Click **Save**

### Part 3: Create Pipeline Job

1. **Create New Job**
   - From Jenkins Dashboard, click **New Item**
   - Enter item name: `React-Selenium-Testing`
   - Select **Pipeline**
   - Click **OK**

2. **Configure General Settings**
   - Description: `Automated testing for React application using Selenium`
   - GitHub project (optional): Enter your repository URL

3. **Configure Build Triggers** (Optional)
   - Select **GitHub hook trigger for GITScm polling** (for automatic builds)
   - Or select **Poll SCM** and set schedule (e.g., `H/15 * * * *` for every 15 minutes)

4. **Configure Pipeline**
   - **Definition**: Select `Pipeline script from SCM`
   - **SCM**: Select `Git`
   - **Repository URL**: Enter your Git repository URL
     ```
     Example: https://github.com/username/react-selenium-app.git
     ```
   - **Credentials**: Add if repository is private
   - **Branch Specifier**: `*/main` (or your branch name)
   - **Script Path**: `Jenkinsfile`
   - Click **Save**

### Part 4: Initial Build

1. **Run First Build**
   - Click **Build Now** in the left sidebar
   - Watch the build progress in **Build History**
   - Click on the build number to see details
   - Click **Console Output** to view logs

2. **Expected Results**
   - You should see all stages executing
   - Tests should run and pass
   - Build should complete successfully

## 🎨 Pipeline Stages Explained

The Jenkinsfile contains these stages:

```
1. Checkout           → Downloads code from Git repository
2. Install Dependencies → Runs npm install
3. Build Application   → Creates production build
4. Start Application   → Starts React app on port 3000
5. Run Selenium Tests  → Executes automated tests
6. Generate Report     → Creates test summary
7. Post Actions        → Cleanup and artifact archival
```

## 🔍 Monitoring Pipeline Execution

### View Pipeline Stages

1. Click on your pipeline job
2. Click on a build number
3. View the **Stage View** to see visual representation
4. Each stage shows:
   - Duration
   - Status (Success/Failed)
   - Logs

### View Console Output

- Click **Console Output** to see detailed logs
- Useful for debugging failures

### View Archived Artifacts

- After build completion, click **Build Artifacts**
- Download:
  - `app.log` - Application logs
  - `test-results/` - Test results summary

## 🐛 Common Issues and Solutions

### Issue 1: "NodeJS not found"

**Solution:**
1. Go to **Manage Jenkins** → **Global Tool Configuration**
2. Ensure NodeJS is configured correctly
3. In Jenkinsfile, verify the tool name matches: `nodejs 'NodeJS 16'`

### Issue 2: "Port 3000 already in use"

**Solution:**
- The Jenkinsfile includes cleanup in post actions
- If persists, manually kill the process:
  ```bash
  pkill -f "react-scripts"
  ```

### Issue 3: "ChromeDriver not found"

**Solution:**
1. Ensure Chrome browser is installed on Jenkins server
2. ChromeDriver is installed via npm (in package.json)
3. For Jenkins on Linux, you might need:
   ```bash
   sudo apt-get update
   sudo apt-get install -y chromium-browser
   ```

### Issue 4: "Permission denied" errors

**Solution:**
1. Ensure Jenkins user has proper permissions
2. On Linux/Mac:
   ```bash
   sudo usermod -a -G sudo jenkins
   sudo chmod -R 755 /var/jenkins_home
   ```

### Issue 5: Tests timing out

**Solution:**
- Increase timeout in Jenkinsfile or test files
- Check if system resources are sufficient
- Verify Chrome can run in headless mode

## 📊 Best Practices

### 1. Notifications

Set up email notifications:
1. Go to **Manage Jenkins** → **Configure System**
2. Configure **Extended E-mail Notification**
3. Add post action in Jenkinsfile:
   ```groovy
   post {
       failure {
           emailext subject: "Build Failed: ${env.JOB_NAME}",
                    body: "Check ${env.BUILD_URL}",
                    to: "your-email@example.com"
       }
   }
   ```

### 2. Parallel Stages

For faster execution, run independent stages in parallel:
```groovy
stage('Tests') {
    parallel {
        stage('Unit Tests') {
            steps { sh 'npm test' }
        }
        stage('Selenium Tests') {
            steps { sh 'npm run test:selenium' }
        }
    }
}
```

### 3. Build Parameters

Make the pipeline configurable:
```groovy
pipeline {
    parameters {
        choice(name: 'BROWSER', choices: ['chrome', 'firefox'], description: 'Browser')
        string(name: 'APP_PORT', defaultValue: '3000', description: 'Port')
    }
    // ...
}
```

### 4. Credentials Management

Store sensitive data securely:
1. Go to **Manage Jenkins** → **Manage Credentials**
2. Add credentials (API keys, tokens, etc.)
3. Use in Jenkinsfile:
   ```groovy
   environment {
       API_KEY = credentials('my-api-key')
   }
   ```

## 📈 Advanced Configuration

### Webhook Integration (GitHub)

1. **In GitHub Repository:**
   - Go to Settings → Webhooks
   - Click **Add webhook**
   - Payload URL: `http://your-jenkins-url/github-webhook/`
   - Content type: `application/json`
   - Select: "Just the push event"
   - Click **Add webhook**

2. **In Jenkins:**
   - In job configuration, enable **GitHub hook trigger**
   - Save

Now builds will trigger automatically on git push!

### Multi-Branch Pipeline

For handling multiple branches:
1. Create **Multibranch Pipeline** instead of regular Pipeline
2. Configure branch sources
3. Jenkins will automatically create pipelines for each branch

### Docker Integration

Run tests in Docker containers:
```groovy
agent {
    docker {
        image 'node:16'
        args '-v $HOME/.npm:/root/.npm'
    }
}
```

## 🎯 Verification Checklist

After setup, verify:

- [ ] Jenkins can access Git repository
- [ ] NodeJS is properly configured
- [ ] Pipeline builds successfully
- [ ] All stages complete
- [ ] Tests execute and pass
- [ ] Artifacts are archived
- [ ] Cleanup happens properly

## 📚 Additional Resources

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [NodeJS Plugin](https://plugins.jenkins.io/nodejs/)
- [Selenium WebDriver Docs](https://www.selenium.dev/documentation/webdriver/)

## 🆘 Getting Help

If you encounter issues:

1. Check Console Output for detailed error messages
2. Review this troubleshooting guide
3. Check Jenkins logs: `/var/jenkins_home/logs/`
4. Consult Jenkins documentation
5. Search Jenkins community forums

---

**Good luck with your Jenkins setup! 🎉**

