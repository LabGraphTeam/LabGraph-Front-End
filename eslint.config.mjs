import pluginJs from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import pluginImport from 'eslint-plugin-import'
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
    rules: {
      semi: ['error', 'never']
    }
  },
  {
    plugins: {
      '@next/next': nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      tailwindcss: pluginTailwindcss,
      import: pluginImport
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json'
        }
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      }
    },
    rules: {
      semi: ['error', 'never'],
      'import/no-unresolved': 'error',
      'import/extensions': ['error', 'never', { json: 'always' }],
      'import/prefer-default-export': 'off',
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before'
            }
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ],
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['../*', '../../*'],
              message: 'Use absolute imports with @/ prefix instead of relative imports'
            }
          ]
        }
      ]
    }
  },
  {
    ...pluginReact.configs.flat.recommended,
    plugins: {
      'react-hooks': pluginReactHooks,
      tailwindcss: pluginTailwindcss,
      import: pluginImport
    },
    rules: {
      semi: ['error', 'never'],
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-contradicting-classname': 'error',
      'tailwindcss/no-custom-classname': 'warn',
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['./', '../*', '../../*'],
              message: 'Use absolute imports with @/ prefix instead of relative imports'
            }
          ]
        }
      ]
    }
  }
]
