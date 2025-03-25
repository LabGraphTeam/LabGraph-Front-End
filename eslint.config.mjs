import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginTailwindcss from 'eslint-plugin-tailwindcss'

import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { tailwindcss: pluginTailwindcss }
  },
  {
    ...pluginReact.configs.flat.recommended,
    plugins: {
      'react-hooks': pluginReactHooks,
      tailwindcss: pluginTailwindcss
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      // Add Tailwind CSS rules explicitly
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-contradicting-classname': 'error',
      'tailwindcss/no-custom-classname': 'warn'
    }
  }
]
