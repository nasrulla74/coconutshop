module.exports = {
  apps: [
    {
      name: "coconut",
      script: "server.js",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
