# React Application Testing using Jenkins and Selenium

A comprehensive demonstration of automated testing for React applications using Selenium WebDriver with Jenkins CI/CD pipeline integration.

## 📋 Table of Contents
- [Overview](#overview)
- [Tools & Technologies](#tools--technologies)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Jenkins Setup](#jenkins-setup)
- [Project Structure](#project-structure)
- [Test Cases](#test-cases)
- [CI/CD Pipeline](#cicd-pipeline)

## 🎯 Overview

This project demonstrates:
- Creating a modern React application with interactive UI components
- Writing automated UI tests using Selenium WebDriver
- Setting up Mocha test framework with Chai assertions
- Configuring Jenkins pipeline for continuous testing
- Implementing best practices for E2E testing

## 🛠️ Tools & Technologies

- **Node.js** (16+) & npm - JavaScript runtime and package manager
- **React.js** (19.x) - Frontend framework
- **Selenium WebDriver** (4.x) - Browser automation
- **Mocha** - Test framework
- **Chai** - Assertion library
- **ChromeDriver** - Chrome browser driver
- **Jenkins** - CI/CD automation server

## ✨ Features

### Application Features
- **Counter Component**: Interactive counter with increment, decrement, and reset functionality
- **Form Component**: Name input with submission and greeting display
- **Modern UI**: Beautiful gradient design with smooth animations
- **Responsive Design**: Mobile-friendly layout

### Testing Features
- Comprehensive Selenium test suite
- Headless browser testing support
- Page load verification
- UI element validation
- Interactive component testing
- Form submission testing

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

```bash
# Check Node.js version (should be 16+)
node --version

# Check npm version
npm --version

# Chrome browser (for local testing)
# Jenkins (for CI/CD pipeline)
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd react-selenium-app
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- React and React-DOM
- Selenium WebDriver
- Mocha test framework
- Chai assertion library
- ChromeDriver

## 💻 Running the Application

### Start Development Server

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## 🧪 Running Tests

### Run Selenium Tests

Make sure the React app is running on port 3000, then:

```bash
npm run test:selenium
```

### Run in Headless Mode

Tests are configured to run in headless mode by default for CI/CD environments.

## 🔧 Jenkins Setup

### Step 1: Install Jenkins

Download and install Jenkins LTS from [jenkins.io](https://www.jenkins.io/)

### Step 2: Install Required Jenkins Plugins

1. Go to **Manage Jenkins** → **Manage Plugins**
2. Install the following plugins:
   - NodeJS Plugin
   - Git Plugin
   - Pipeline Plugin

### Step 3: Configure NodeJS

1. Go to **Manage Jenkins** → **Global Tool Configuration**
2. Add NodeJS installation:
   - Name: `NodeJS 16`
   - Version: Select Node.js 16.x or later
   - Save configuration

### Step 4: Create Jenkins Pipeline Job

1. Click **New Item**
2. Enter job name: `React-Selenium-Testing`
3. Select **Pipeline**
4. Click **OK**

### Step 5: Configure Pipeline

In the Pipeline section:

1. **Definition**: Pipeline script from SCM
2. **SCM**: Git
3. **Repository URL**: Your Git repository URL
4. **Branch**: `*/main` (or your branch name)
5. **Script Path**: `Jenkinsfile`
6. Save

### Step 6: Run Pipeline

Click **Build Now** to execute the pipeline.

## 📁 Project Structure

```
react-selenium-app/
├── public/                 # Static files
├── src/
│   ├── App.js             # Main React component
│   ├── App.css            # Application styles
│   ├── index.js           # React entry point
│   └── ...
├── test/
│   └── selenium/
│       └── app.test.js    # Selenium test suite
├── Jenkinsfile            # Jenkins pipeline configuration
├── package.json           # Project dependencies and scripts
└── README.md             # This file
```

## 🎯 Test Cases

### Page Load Tests
- ✅ Application loads successfully
- ✅ Main title displays correctly

### Counter Functionality Tests
- ✅ Initial counter value is 0
- ✅ Increment button increases counter
- ✅ Decrement button decreases counter
- ✅ Reset button returns counter to 0
- ✅ Multiple increment operations work correctly

### Form Functionality Tests
- ✅ Name input field is visible
- ✅ Text input is accepted
- ✅ Greeting message displays after submission
- ✅ Greeting updates with different names

### UI Element Verification Tests
- ✅ All buttons are visible
- ✅ Button text is correct
- ✅ Input placeholder text is correct

## 🔄 CI/CD Pipeline

The Jenkinsfile defines the following stages:

### 1. Checkout
- Checks out code from the Git repository

### 2. Install Dependencies
- Runs `npm install` to install all required packages

### 3. Build Application
- Executes `npm run build` to create production build

### 4. Start Application
- Starts the React application on port 3000
- Waits for the app to be ready
- Verifies app is accessible

### 5. Run Selenium Tests
- Executes the Selenium test suite
- Tests run in headless Chrome browser

### 6. Generate Test Report
- Creates test results summary
- Archives test artifacts

### 7. Post Actions (Always)
- Stops the React application
- Archives logs and test results
- Cleans up processes

## 📊 Expected Output

When the pipeline executes successfully, you'll see:

```
✓ Stage: Checkout - SUCCESS
✓ Stage: Install Dependencies - SUCCESS
✓ Stage: Build Application - SUCCESS
✓ Stage: Start Application - SUCCESS
✓ Stage: Run Selenium Tests - SUCCESS
  ✓ 15 tests passing
✓ Stage: Generate Test Report - SUCCESS
```

## 🐛 Troubleshooting

### Common Issues

**Issue**: Port 3000 already in use
```bash
# Kill the process using port 3000
kill -9 $(lsof -ti:3000)
```

**Issue**: ChromeDriver version mismatch
```bash
# Reinstall chromedriver
npm uninstall chromedriver
npm install chromedriver
```

**Issue**: Tests timing out
- Increase timeout in test files (default: 30000ms)
- Check if application is running on port 3000
- Verify Chrome browser is installed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## 📝 Notes

- Tests run in headless mode for CI/CD environments
- Application must be running before executing tests
- Jenkins pipeline automatically handles app lifecycle
- Chrome browser and ChromeDriver are required

## 📄 License

This project is created for educational purposes.

## 👥 Authors

Created as a demonstration of React testing with Jenkins and Selenium.

## 🙏 Acknowledgments

- React team for the amazing framework
- Selenium WebDriver for browser automation
- Jenkins community for CI/CD tools
- Mocha and Chai for testing utilities

---

**Happy Testing! 🚀**
