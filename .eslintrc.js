/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    // "plugin:@typescript-eslint/eslint-recommended",
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:security/recommended'
    // "plugin:editorconfig/all",
    // "plugin:editorconfig/noconflict"
  ],
  overrides: [
    {
      files: ['tests/**'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      rules: { 'jest/prefer-expect-assertions': 'off' }
    }
  ],
  plugins: [
    '@typescript-eslint',
    // "editorconfig",
    'folders',
    'import',
    'prettier',
    'simple-import-sort',
    'unused-imports'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    sourceType: 'module'
  },
  rules: {
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
    'array-element-newline': 0,
    complexity: ['error', 10],
    eqeqeq: 'error',
    'max-depth': ['error', 3],
    'max-len': [
      1,
      {
        code: 120,
        ignoreComments: true
      }
    ], // .prettierrc helps, 1 = warning
    'max-lines-per-function': [1, { 'max': 50, 'skipBlankLines': true, 'skipComments': true }], // 1 = warning
    'max-params': ['error', 6],
    'no-console': 'warn',
    'no-prototype-builtins': 'off',
    'no-use-before-define': 0,
    'no-var': 'error',
    'object-property-newline': 'error',
    'object-shorthand': 'error',
    // Hide conflict with prettier
    // "operator-linebreak": [
    //   "error",
    //   "after",
    //   { "overrides": { "?": "before", ":": "before", "&&": "before", "||": "before" } }
    // ],
    'prefer-const': 'error',
    'prefer-destructuring': 'warn',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',
    'prefer-template': 'error',
    yoda: 'error',
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
  }
}
