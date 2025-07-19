import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
import jestDom from 'eslint-plugin-jest-dom'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default antfu(
  {
    react: true,
    typescript: true,

    // Configuration preferences
    lessOpinionated: true,
    isInEditor: false,

    // Code style
    stylistic: {
      semi: false,
      indent: 2,
      quotes: 'single',
      blockSpacing: true,
      commaDangle: 'always',
    },

    // Format settings
    formatters: {
      javascript: true,
      typescript: true,
      css: true,
    },

    // Ignored paths
    ignores: [
      'migrations/**/*',
      './src/types/index.ts',
      '/dist',
      '/coverage',
      '/.nx/cache',
      '/.nx/workspace-data',
    ],
  },
  // --- Next.js Specific Rules ---
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  // --- Accessibility Rules ---
  jsxA11y.flatConfigs.recommended,
  // --- Testing Rules ---
  {
    files: ['**/*.test.ts?(x)'],
    ...jestDom.configs['flat/recommended'],
  },
  // --- Custom Rule Overrides ---
  {
    rules: {
      'antfu/consistent-line-newline': 'off',
      'jsonc/sort-keys': 'off',
      curly: 'off',
      'antfu/no-top-level-await': 'off', // Allow top-level await
      'style/eol-last': 'off',
      'style/semi': 'off',
      'style/quote-props': 'off',
      'style/quotes': 'off',
      'style/jsx-tag-spacing': 'off',
      'style/comma-dangle': 'off',
      'ts/no-redeclare': 'off',
      'style/member-delimiter-style': 'off',
      'style/no-trailing-spaces': 'off',
      'style/brace-style': ['error', '1tbs'], // Use the default brace style
      'ts/consistent-type-definitions': 'off', // Use `type` instead of `interface`
      'ts/consistent-type-imports': 'off', // Use `type` instead of `interface`
      'react/prefer-destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
      'node/prefer-global/process': 'off', // Allow using `process.env`
      'no-useless-return': 'off',
      'no-unused-expressions': 'off',
      'prefer-const': 'off',
      'perfectionist/sort-named-imports': 'off',
      'format/prettier': 'off',
      'test/padding-around-all': 'error', // Add padding in test files
      'test/consistent-test-it': 'off', // Add padding in test files
      'test/prefer-lowercase-title': 'off', // Allow using uppercase titles in test titles
      'unicorn/prefer-number-properties': 'off',
      'react-dom/no-missing-button-type': 'off',
      'unused-imports/no-unused-vars': 'off',
      'style/operator-linebreak': 'off',
      'style/jsx-one-expression-per-line': 'off',
      'style/object-curly-spacing': 'off',
      'style/style/jsx-wrap-multilines': 'off',
      'style/no-multi-spaces': 'off',
      'style/no-multiple-empty-lines': 'off',
      'style/no-mixed-spaces-and-tabs': 'off',
      'style/jsx-indent-props': 'off',
      'style/jsx-curly-newline': 'off',
      'style/jsx-closing-bracket-location': 'off',
      'style/no-tabs': 'off',
      'style/indent': 'off',
      'style/multiline-ternary': 'off',
      'style/jsx-closing-tag-location': 'off',
      'style/arrow-parens': 'off',
      'style/jsx-wrap-multilines': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
      'no-console': 'warn',
      'react-hooks/exhaustive-deps': 'off',
      'perfectionist/sort-imports': 'off',
      'yaml/plain-scalar': 'off',
      'yaml/quotes': 'off',
    },
  },
)
