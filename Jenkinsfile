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
        bat """
          echo === Current directory contents ===
          dir

          echo === package.json content ===
          type package.json

          echo === Cleaning previous install ===
          if exist package-lock.json del package-lock.json
          if exist node_modules rmdir /s /q node_modules

          echo === Installing dependencies ===
          npm install --no-optional --verbose

          echo === Installed packages ===
          npm list --depth=0 || echo Package list failed but continuing
        """
      }
    }

    // stage('Verify TypeScript Setup') {
    //   steps {
    //     bat """
    //       echo === Checking TypeScript packages ===
    //       npm list typescript @types/react @types/node || (
    //         echo === Installing missing TypeScript packages ===
    //         npm install --save-dev typescript @types/react @types/node
    //       )

    //       echo === Check tsconfig.json ===
    //       if exist tsconfig.json (
    //         echo tsconfig.json exists
    //       ) else (
    //         echo Creating tsconfig.json...
    //         npx tsc --init --target es2017 --module esnext --jsx preserve --strict --esModuleInterop --skipLibCheck --forceConsistentCasingInFileNames --moduleResolution node --allowJs --noEmit --incremental --resolveJsonModule --isolatedModules
    //       )

    //       echo === Verifying TypeScript compiler version ===
    //       npx tsc --version
    //     """
    //   }
    // }
    stage('Verify TypeScript Setup') {
  steps {
    bat """
      echo === FORCING installation of TypeScript and type packages ===
      npm install --save-dev typescript @types/react @types/node --legacy-peer-deps --verbose

      echo === Verifying install ===
      npm list typescript @types/react @types/node || echo TypeScript packages check failed (non-blocking)

      echo === Ensuring tsconfig.json exists ===
      if exist tsconfig.json (
        echo tsconfig.json exists
      ) else (
        echo Creating default tsconfig.json...
        npx tsc --init --target es2017 --module esnext --jsx preserve --strict --esModuleInterop --skipLibCheck --forceConsistentCasingInFileNames --moduleResolution node --allowJs --noEmit --incremental --resolveJsonModule --isolatedModules
      )

      echo === TypeScript version ===
      npx tsc --version
    """
  }
}


    stage('Install Playwright Browsers') {
      steps {
        bat """
          echo === Setting up Playwright cache directory ===
          if not exist "%APPDATA%\\npm" mkdir "%APPDATA%\\npm"
          npm config set cache "%TEMP%\\npm-cache"

          echo === Installing Playwright browsers ===
          npx playwright install
        """
      }
    }

    stage('Build App') {
      steps {
        bat """
          echo === Disabling Next.js telemetry ===
          npx next telemetry disable

          echo === Building Next.js app ===
          npm run build
        """
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
      bat 'node scripts\\postscript.js'
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
