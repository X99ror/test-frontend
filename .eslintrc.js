module.exports = {
    extends: [
      'react-app', // Extending the React app configuration
    ],
    plugins: ['react'], // Ensure that the react plugin is included
    env: {
      browser: true,
      es2021: true,
    },
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // You can add custom ESLint rules here
    },
  };
  