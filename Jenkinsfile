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
        bat '''
          if exist package-lock.json del package-lock.json
          if exist node_modules rmdir /s /q node_modules
          npm cache clean --force
          npm install
          npm install --save-dev typescript @types/react @types/node
        '''
      }
    }

    stage('Verify TypeScript Installation') {
      steps {
        bat '''
          npm list typescript @types/react @types/node
          npx tsc --version
        '''
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        bat '''
          if not exist "%APPDATA%\\npm" mkdir "%APPDATA%\\npm"
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

      // Run Python script (using python from PATH)
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