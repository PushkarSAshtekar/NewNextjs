pipeline {
  agent any

  environment {
    NODE_ENV = 'production'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/PushkarSAshtekar/mytestapp.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        bat 'npm install'
        bat 'npm install --save-dev typescript @types/react @types/node'
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        bat '''
          mkdir "%APPDATA%\\npm" 2>nul || echo npm dir exists
          npm config set cache "%TEMP%\\npm-cache"
          npx playwright install
        '''
      }
    }

    stage('Build App') {
      steps {
        bat 'npm run build'
      }
    }

    stage('Run Tests') {
      steps {
        echo '🧪 Running Playwright Tests...'
        bat 'npm run test'
      }
    }
  }

  post {
    success {
      echo '✅ Pipeline passed! Running postscript tasks...'

      // Run Node.js script
      bat 'node scripts\\postscript.js'

      // Run Python script
      bat 'python scripts\\postscript.py'
    }

    failure {
      echo '❌ Pipeline failed!'
    }

    always {
      cleanWs()
    }
  }
}
