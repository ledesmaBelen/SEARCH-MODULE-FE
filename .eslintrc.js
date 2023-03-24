module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    extends: [
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
    ],
    overrides: [
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
        js: true
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: [
      'react'
    ],
    rules: {
    }
  }
  