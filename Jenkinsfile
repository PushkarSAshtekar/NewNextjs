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
     success {
      echo '✅ Pipeline passed! Running postscript tasks...'

      // Run Node.js script
      // bat 'node postscript.js'
       bat 'node "C:\\Cucumber js pratice\\NewNextjs\\my-app\\postscript.js"'

      // Run Python script
      // bat 'python postscript.py'
       bat '"C:\\Program Files\\Python313\\python.exe" "C:\\Cucumber js pratice\\NewNextjs\\my-app\\postscript.py"'
    }

    failure {
      echo '❌ Pipeline failed!'
    }
    always {
      cleanWs()
    }
  }
}