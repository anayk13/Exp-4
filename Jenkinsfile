pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/<your-username>/PythonTest.git'
            }
        }

        stage('Setup Environment') {
            steps {
                sh 'python3 -m venv venv'
                sh './venv/bin/pip install -r requirements.txt'
            }
        }

        stage('Run Tests') {
            steps {
                sh './venv/bin/pytest --junitxml=results.xml'
            }
            post {
                always {
                    junit 'results.xml'
                }
            }
        }
    }
}
