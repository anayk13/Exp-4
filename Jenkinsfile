pipeline {
    agent any

    tools {
        nodejs 'NodeJS 16'  // Configure this in Jenkins Global Tool Configuration
    }

    environment {
        APP_PORT = '3000'
        PROJECT_DIR = 'react-selenium-app'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                dir("${PROJECT_DIR}") {
                    sh 'npm install'
                }
            }
        }

        stage('Build Application') {
            steps {
                echo 'Building React application...'
                dir("${PROJECT_DIR}") {
                    sh 'npm run build'
                }
            }
        }

        stage('Start Application') {
            steps {
                echo 'Starting React application on port 3000...'
                dir("${PROJECT_DIR}") {
                    script {
                        // Start the application in background
                        sh 'nohup npm start > app.log 2>&1 &'
                        // Wait for app to be ready
                        sh 'sleep 10'
                        // Verify app is running
                        sh 'curl -I http://localhost:3000 || true'
                    }
                }
            }
        }

        stage('Run Selenium Tests') {
            steps {
                echo 'Running Selenium tests...'
                dir("${PROJECT_DIR}") {
                    script {
                        try {
                            sh 'npm run test:selenium'
                        } catch (Exception e) {
                            echo "Tests failed: ${e.message}"
                            currentBuild.result = 'UNSTABLE'
                        }
                    }
                }
            }
        }

        stage('Generate Test Report') {
            steps {
                echo 'Generating test report...'
                dir("${PROJECT_DIR}") {
                    script {
                        // Archive test results if they exist
                        sh 'mkdir -p test-results'
                        sh 'echo "Test execution completed" > test-results/summary.txt'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Stopping React application...'
            script {
                // Kill the React app process
                sh 'pkill -f "react-scripts" || true'
                sh 'pkill -f "node.*npm.*start" || true'
            }
            
            echo 'Cleaning up...'
            dir("${PROJECT_DIR}") {
                // Archive logs and results
                archiveArtifacts artifacts: 'app.log,test-results/**/*', allowEmptyArchive: true
            }
        }
        
        success {
            echo 'Pipeline executed successfully!'
        }
        
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
        
        unstable {
            echo 'Pipeline completed with test failures.'
        }
    }
}
