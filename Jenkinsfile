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

        stage('Backend') {
            steps {
                echo 'Bringing up Backend'
                dir('Backend') {
                    sh 'docker build -t backend:latest .'
                    sh 'docker run -d --name backend --net=host backend:latest'
                }
            }
        }

        stage('Frontend') {
            steps {
                echo 'Bringing up Frontend'
                dir('Frontend') {
                    sh 'docker build -t frontend:latest .'
                    sh 'docker run -d --name frontend -e VITE_API_URL="http://192.168.1.16:3000" --net=host frontend:latest'
                }
            }
        }
        
    
    }
}