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

    stage('Prescript Check') {
      steps {
        echo '🔍 Running Prescript: Check versions'
        bat 'node -v'
        bat 'python --version'
      }
    }

    stage('Install Dependencies') {
      steps {
        bat 'npm install'
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
      bat 'node postscript.js'

      // Run Python script
      bat 'python postscript.py'
    }

    failure {
      echo '❌ Pipeline failed!'
    }

    always {
      cleanWs()
    }
  }
}
