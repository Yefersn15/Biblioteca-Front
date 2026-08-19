import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // "recommended" trata como error el patrón estándar de fetch-on-mount
      // (efecto que llama a una función async que hace setState tras el
      // await). Es código React idiomático y correcto, así que se deja como
      // aviso en vez de bloquear el build.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
])
