export const sharedRules = {
  '@typescript-eslint/explicit-function-return-type': 'warn', // Functions need return type
  '@typescript-eslint/consistent-type-assertions': [
    'error',
    { assertionStyle: 'never' }, // No 'as'
  ],
  '@typescript-eslint/no-shadow': 'error', // Variables can't shadow declarations in the outer scope
  eqeqeq: 'error', // Enforce === and !==
  'prefer-const': 'error', // Use const when variables aren't reassigned
  'no-console': 'warn', // No console log
}
