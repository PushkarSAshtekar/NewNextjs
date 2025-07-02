pipeline {
  agent any

  environment {
    NODE_ENV = 'production'
    PYTHON_EXE = 'C:\\Program Files\\Python313\\python.exe'
    PM2_CMD = 'C:\\Users\\pusht\\AppData\\Roaming\\npm\\pm2.cmd'
  }

  stages {
    stage('Prescript - Check Environment Versions') {
      steps {
        bat '''
          echo 🔍 Checking Node.js version...
          node -v

          echo 🔍 Checking npm version...
          npm -v

          echo 🔍 Checking Python version...
          "%PYTHON_EXE%" --version
        '''
      }
    }

    stage('Checkout') {
      steps {
        echo '📥 Repository will be cloned by Jenkins'
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
        bat 'npm run build || echo "⚠️ Skipping build due to missing TypeScript config or not needed."'
      }
    }

    stage('Run Tests') {
      steps {
        bat 'npx playwright test'
      }
    }

    stage('Restart App with PM2') {
      steps {
        bat '''
          echo 🔁 Restarting app with PM2...

          rem Delete previous instance
          "%PM2_CMD%" delete next-app || echo "No previous PM2 process"

          rem Start using ecosystem config
          "%PM2_CMD%" start ecosystem.config.js

          rem Save PM2 process list
          "%PM2_CMD%" save
        '''
      }
    }
  }

  post {
    success {
      echo '✅ Pipeline passed! Running postscript tasks...'

      // Run Node.js script
      bat 'node "C:\\Cucumber js pratice\\NewNextjs\\my-app\\postscript.js"'

      // Run Python script
      bat '"%PYTHON_EXE%" "C:\\Cucumber js pratice\\NewNextjs\\my-app\\postscript.py"'
    }

    failure {
      echo '❌ Pipeline failed!'
    }

    always {
      cleanWs()
    }
  }
}
