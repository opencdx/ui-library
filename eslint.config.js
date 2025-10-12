const js = require('@eslint/js');
const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const storybook = require('eslint-plugin-storybook');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'storybook': storybook,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...storybook.configs.recommended.rules,
      // TypeScript already knows undefined variables; avoid false positives in types
      'no-undef': 'off',
      // Relax noisy rule for empty object types used in our public types
      '@typescript-eslint/no-empty-object-type': 'off',
      // Allow common short-circuit expressions in React handlers
      '@typescript-eslint/no-unused-expressions': 'off',
      // Allow existing ts-ignore usage in third-party adapted code
      '@typescript-eslint/ban-ts-comment': 'off',
      // We intentionally use sparse arrays in a few spots for alignment
      'no-sparse-arrays': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  // Node/Tooling configs
  {
    files: ['**/*.config.ts', 'cypress.config.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      '*.config.js',
      'cypress/',
      '.eslintrc.js',
      '.storybook/**',
      'src/stories/**',
      // Playwright artifacts
      'playwright-report/',
      'test-results/',
      'playwright/.cache/',
      '.playwright/',
      '**/.cache/',
      'coverage/',
      'storybook-static/',
    ],
  },
];
