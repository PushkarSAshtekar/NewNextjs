pipeline {
  agent any

  environment {
    NODE_ENV = 'production'
  }

  stages {
    stage('Checkout') {
      steps {
        echo 'Repository will be cloned by Jenkins'
      }
    }

    stage('Install Dependencies') {
      steps {
        bat 'npm install'
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        bat 'npx playwright install'
      }
    }

    stage('Build App') {
      steps {
        bat 'npm run build || echo "Skipping build due to missing TypeScript config or not needed."'
      }
    }

    stage('Run Tests') {
      steps {
        bat 'npx playwright test'
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}