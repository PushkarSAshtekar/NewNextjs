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
          echo Current directory contents:
          dir
          
          echo Package.json content:
          type package.json
          
          echo Cleaning previous installation...
          if exist package-lock.json del package-lock.json
          if exist node_modules rmdir /s /q node_modules
          
          echo Installing all dependencies from package.json...
          npm install --no-optional --verbose
          
          echo Checking what was actually installed:
          dir node_modules 2>nul || echo node_modules not created
          npm list --depth=0 || echo Package list failed but continuing
        '''
      }
    }

    stage('Verify TypeScript Setup') {
      steps {
        bat '''
          echo Checking if TypeScript files exist in node_modules...
          if exist node_modules\\typescript (
            echo TypeScript found in node_modules
            npx tsc --version
          ) else (
            echo TypeScript not found, attempting manual installation...
            npm install typescript @types/react @types/node --no-save --verbose
          )
          
          echo Checking tsconfig.json...
          if exist tsconfig.json (
            echo tsconfig.json found
          ) else (
            echo Creating tsconfig.json...
            npx tsc --init --target es2017 --module esnext --jsx preserve --strict --esModuleInterop --skipLibCheck --forceConsistentCasingInFileNames --moduleResolution node --allowJs --noEmit --incremental --resolveJsonModule --isolatedModules
          )
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