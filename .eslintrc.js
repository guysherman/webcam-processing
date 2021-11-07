const prettierConfig = require('./prettier.config');

module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  plugins: [
    'jsx-a11y'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:react/recommended', // Enabled react rules for frontend packages
    'plugin:react-hooks/recommended', // Enforces the rules of hooks
    'plugin:jsx-a11y/recommended', // JSX Accessibility rules
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    'no-console': 'error',
    'prettier/prettier': [
      'error',
      prettierConfig,
    ],
  },
  overrides: [
    {
      files: [
        '**/*.js'
      ],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      }
    },
    {
      files: [
        '**/*.test.{js,ts,tsx}',
      ],
      rules: {
        '@typescript-eslint/no-empty-function': 'off'
      }
    }
  ]
};
