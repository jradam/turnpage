import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'
import { sharedRules } from '../eslint.rules.mjs'

const rules = {
  ...typescript.configs.strict.rules,
  ...sharedRules,
}

export default [
  { ignores: ['dist/'] },
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    plugins: { '@typescript-eslint': typescript },
    languageOptions: {
      parser: tsParser,
      globals: { ...globals.node, ...globals.browser },
    },
    rules,
  },
]
