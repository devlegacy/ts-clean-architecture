/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    // es2020: true,
    node: true,
    jest: true
  },
  // Read more on: https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser#configuration
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // ecmaVersion: 'latest',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    // "editorconfig",
    'folders',
    'import',
    // 'prettier',
    'simple-import-sort',
    'unused-imports'
  ],
  extends: [
    'eslint:recommended',
    // 'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:security/recommended'
    // "plugin:editorconfig/all",
    // "plugin:editorconfig/noconflict"
  ],
  // Read more on: https://eslint.org/docs/latest/rules/
  rules: {
    'array-element-newline': 'off',
    complexity: ['error', 10],
    eqeqeq: 'error',
    'max-depth': ['error', 3],
    'max-len': [
      'warn',
      {
        code: 120,
        ignoreComments: true,
        ignorePattern: '^import .*'
      }
    ], // .prettierrc helps
    'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
    'max-params': ['error', 6],
    'no-console': 'warn',
    'no-prototype-builtins': 'off',
    'no-use-before-define': 'off',
    'no-var': 'error',
    'object-property-newline': 'error',
    'object-shorthand': 'error',
    // Hide conflict with prettier
    // "operator-linebreak": [
    //   "error",
    //   "after",
    //   { "overrides": { "?": "before", ":": "before", "&&": "before", "||": "before" } }
    // ],
    // quotes: ['error', 'single'],
    'prefer-const': 'error',
    'prefer-destructuring': 'warn',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',
    'prefer-template': 'error',
    // semi: ['error', 'never'],
    yoda: 'error',
    // Plugins
    '@typescript-eslint/array-type': 'warn',
    '@typescript-eslint/member-ordering': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_', // use pipe (|) to add more
        ignoreRestSiblings: true
      }
    ],
    // 'prettier/prettier': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    // kebab-case
    'folders/match-regex': ['error', '^[a-z-]+$', '/src/']
  },
  overrides: [
    {
      files: ['tests/**'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
        'jest/prefer-expect-assertions': 'off',
        'jest/no-standalone-expect': 'off',
        'jest/no-mocks-import': 'off'
      }
    }
  ]
}
