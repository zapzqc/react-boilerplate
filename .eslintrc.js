module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'airbnb',
    'airbnb-typescript',
  ],
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
  },
  rules: {
    'max-len': ['error', { code: 160 }],
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['**/*.test.ts', '**/*.spec.js', 'setupTests.ts', 'setupTests.ts', 'webpack.config.js'],
    }],
  },
  ignorePatterns: ['.stylelintrc.js'],
};
