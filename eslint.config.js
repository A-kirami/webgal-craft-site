import { fileURLToPath } from 'node:url'

import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import unocss from '@unocss/eslint-config/flat'
import { defineConfig, includeIgnoreFile } from 'eslint/config'
import eslintPluginAstro from 'eslint-plugin-astro'
import eslintPluginImportX from 'eslint-plugin-import-x'
import eslintPluginSvelte from 'eslint-plugin-svelte'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  eslintPluginUnicorn.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],
  ...eslintPluginSvelte.configs['flat/recommended'],
  stylistic.configs.recommended,
  unocss,
  includeIgnoreFile(gitignorePath),
  {
    ignores: ['dist/**', '.astro/**', 'public/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx,astro,svelte}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'array-callback-return': 'error',
      'accessor-pairs': 'error',
      'curly': 'error',
      'default-case': 'error',
      'default-case-last': 'error',
      'default-param-last': 'error',
      'dot-notation': 'error',
      'eqeqeq': 'error',
      'func-names': ['error', 'as-needed'],
      'guard-for-in': 'error',
      'new-cap': ['error', { capIsNewExceptions: ['UnoCSS'] }],
      'no-alert': 'error',
      'no-await-in-loop': 'error',
      'no-console': 'warn',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-eval': 'error',
      'object-shorthand': ['warn', 'always'],
      'unicorn/consistent-boolean-name': 'off',
      'unicorn/no-declarations-before-early-exit': 'off',
      'unicorn/no-for-each': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-await': 'off',
      'unicorn/prefer-number-coercion': 'off',
      'import-x/no-unresolved': [
        'error',
        {
          ignore: [String.raw`.*\?(url|inline|raw|worker|sharedworker)$`],
        },
      ],
      'import-x/order': [
        'warn',
        {
          'groups': ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type'],
          'newlines-between': 'always',
          'alphabetize': { order: 'asc', caseInsensitive: true },
        },
      ],
      'import-x/newline-after-import': 'warn',
      'import-x/no-named-as-default-member': 'off',
      'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
      'import-x/consistent-type-specifier-style': ['warn', 'prefer-inline'],
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/name-replacements': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/no-useless-undefined': ['warn', { checkArguments: false }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@stylistic/no-multiple-empty-lines': 'off',
      '@stylistic/brace-style': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/dot-location': ['error', 'property'],
      '@stylistic/generator-star-spacing': ['warn', { before: false, after: true, shorthand: 'before' }],
      '@stylistic/newline-per-chained-call': ['warn', { ignoreChainWithDepth: 3 }],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      '@stylistic/operator-linebreak': ['warn', 'before', { overrides: { '=': 'after' } }],
      '@typescript-eslint/no-inferrable-types': ['warn', { ignoreParameters: true, ignoreProperties: true }],
    },
  },
  {
    files: [
      '*.{config,setup}.{js,mjs,cjs,ts}',
      '**/*.{spec,test}.ts',
    ],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: [
      'src/**/*.{astro,svelte}',
      'src/components/islands/**/*.ts',
      'src/lib/motion.ts',
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.{astro,svelte}'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      '@stylistic/indent': 'off',
      '@stylistic/jsx-closing-tag-location': 'off',
      '@stylistic/jsx-one-expression-per-line': 'off',
      '@stylistic/no-multiple-empty-lines': 'off',
    },
  },
  {
    files: ['**/*.svelte'],
    rules: {
      'svelte/require-each-key': 'error',
      'unicorn/no-top-level-assignment-in-function': 'off',
    },
  },
)
