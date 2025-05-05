import next from '@next/eslint-plugin-next';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

// Base configurations that apply to all files
const baseConfig = {
  ignores: [
    'node_modules/**',
    '.next/**',
    '.out/**',
    'dist/**',
    'build/**',
    'coverage/**',
    '!**/.prettierrc',
    '.lintstagedrc.cjs',
    'src/components/ui/**',
  ],
};

// Common settings for JavaScript/TypeScript files
const commonJsTs = {
  plugins: {
    prettier,
    '@typescript-eslint': typescriptEslint,
    react,
    'react-hooks': reactHooks,
    'jsx-a11y': jsxA11Y,
    '@next/next': next,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.browser,
    },
    ecmaVersion: 2023,
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  rules: {
    // Error Prevention
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-alert': 'error',
    'no-duplicate-imports': 'error',
    'no-unused-private-class-members': 'error',
    'no-unused-vars': 'off', // Turned off in favor of the TypeScript version
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',

    // React
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/no-array-index-key': 'warn',
    'react/no-danger': 'error',
    'react/jsx-no-useless-fragment': 'warn',
    'react/self-closing-comp': 'error',

    // React Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Prettier
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],

    // Accessibility
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',

    // Next.js
    '@next/next/no-duplicate-head': 'off',
    '@next/next/no-html-link-for-pages': 'error',
    '@next/next/no-img-element': 'warn', // Encourage using Next.js Image component
    '@next/next/no-unwanted-polyfillio': 'warn',
  },
};

// TypeScript-specific configuration
const tsConfig = {
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: ['./tsconfig.json'],
    },
  },
  rules: {
    // TypeScript-specific rules
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        allowDirectConstAssertionInArrowFunctions: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
        minimumDescriptionLength: 10,
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/method-signature-style': ['error', 'property'],
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
  },
};

// JavaScript-only files
const jsConfig = {
  files: ['**/*.js', '**/*.jsx'],
};

// Config files (.mjs/.cjs files)
const configFiles = {
  files: ['**/*.mjs', '**/*.cjs', '*.config.js', '*.config.mjs', 'eslint.config.mjs', 'postcss.config.mjs'],
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
    },
  },
  rules: {
    // Relaxed rules for config files
    'no-console': 'off',
  },
};

export default [baseConfig, commonJsTs, jsConfig, tsConfig, configFiles];
