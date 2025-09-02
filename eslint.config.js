// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginPrettier from 'eslint-plugin-prettier'
import prettier from 'eslint-config-prettier'
import pluginVitest from 'eslint-plugin-vitest'
import pluginImport from 'eslint-plugin-import'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...globals.vitest,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      prettier: pluginPrettier,
      vitest: pluginVitest,
      import: pluginImport,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'import/order': ['warn', { groups: ['builtin', 'external', 'internal'] }],
    },
  },
  {
    rules: prettier.rules,
  },
])
