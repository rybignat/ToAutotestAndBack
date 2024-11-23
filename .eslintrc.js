module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  extends: [
    'standard-with-typescript'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    semi: ['error', 'always'], // Правило для JS: всегда ставить точки с запятой
    '@typescript-eslint/semi': ['error', 'always'] // Правило для TS: всегда ставить точки с запятой
  }
}
