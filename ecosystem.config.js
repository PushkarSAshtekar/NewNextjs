module.exports = {
  apps: [{
    name: 'next-app',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: './',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
