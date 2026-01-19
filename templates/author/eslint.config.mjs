import eslintPluginAstro from 'eslint-plugin-astro'
import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'
import { sharedRules } from '../../eslint.rules.mjs'

const rules = {
  ...typescript.configs.strict.rules,
  ...sharedRules,
}

const allGlobals = {
  ...globals.node,
  ...globals.browser,
}

const jsSettings = {
  files: ['**/*.mjs'],
  languageOptions: { globals: allGlobals },
}

const typescriptSettings = {
  files: ['**/*.ts'],
  plugins: { '@typescript-eslint': typescript },
  languageOptions: { parser: tsParser, globals: allGlobals },
  rules,
}

const astroSettings = {
  files: ['**/*.astro'],
  plugins: { '@typescript-eslint': typescript },
  languageOptions: { globals: allGlobals },
  rules,
}

export default [
  { ignores: ['.astro/', 'dist/'] },
  js.configs.recommended,
  ...eslintPluginAstro.configs['jsx-a11y-strict'],
  ...eslintPluginAstro.configs.recommended,
  jsSettings,
  typescriptSettings,
  astroSettings,
]
