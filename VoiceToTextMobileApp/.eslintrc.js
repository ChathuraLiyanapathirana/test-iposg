module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  plugins: ['prettier', 'react', 'react-hooks', '@typescript-eslint', 'jest'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'warn',
    'no-console': ['warn', {allow: ['warn', 'error']}],
    'no-undef': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/**/*.{js,jsx,ts,tsx}',
        '**/*.{spec,test}.{js,jsx,ts,tsx}',
      ],
      env: {
        'jest/globals': true,
      },
    },
  ],
};
