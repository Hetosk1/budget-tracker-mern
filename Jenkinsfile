pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                cleanWs()
                git credentialsId: '8825ed9b-6f92-4cef-b956-8a829343530d', branch: 'master', url: 'https://github.com/Hetosk1/budget-tracker-mern.git'
                sh 'echo "Stage 1: Checkout ✅"'
            }
        }
        
        stage('Log into Docker'){
            steps {
                withCredentials([usernamePassword(credentialsId: '6d00930e-844c-4bf7-807e-0fb5f782b0c3', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                }
            }
        }
        

        stage('Build & Deploy Container') {
            steps {
                sh 'docker-compose up -d'
                sh 'echo "Stage 2: Building Container Completed ✅"'
            }
        }

    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}