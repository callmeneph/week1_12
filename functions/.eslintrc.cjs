// Minimal, forgiving ESLint config for Cloud Functions (CJS file)
module.exports = {
  root: true,
  env: { node: true, es2022: true },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  extends: ['eslint:recommended'],
  rules: {
    // keep it chill so lint never blocks deployment
    quotes: 'off',
    semi: 'off',
    'object-curly-spacing': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
}
