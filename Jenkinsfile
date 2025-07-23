pipeline {
    agent any

    environment {
        GIT = credentials('git-token')
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Pulling code from Github"
                git credentialsId: 'git-token', url: 'https://github.com/Hetosk1/budget-tracker-mern.git', branch: 'main'

            }
        }
        
        stage('Database') {
            steps {
                echo 'Bringing up database'
                sh 'docker run -d --name mymongo --net=host mongo:latest'
            }
        }

        stage('Building containers') {
            steps {
                echo 'Building containers'
                dir('Backend') {
                    sh 'docker build -t backend:latest .'
                }

                dir('Frontend') {
                    sh 'docker build -t frontend:latest .'
                }
            }
        }

        stage('Running Containers'){
            steps {
                echo 'Building containers'
                dir('Backend'){
                    sh 'docker run -d --name backend --net=host backend:latest'
                }
                dir('Frontend'){
                    sh 'docker run -d --name frontend -e VITE_API_URL="http://192.168.1.16:3000" --net=host frontend:latest'
                }
            }
        }

        stage('Health') {
            steps {
                echo "Post Deployment Heath Checks"
                sh 'curl "http://192.168.1.16"'
                sh 'curl "http://192.168.1.16:3000"'
                sh 'curl "http://192.168.1.16:27017"'
            }
        }
        
    
    }
}