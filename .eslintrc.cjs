/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    // es2020: true,
    node: true,
    jest: true,
  },
  // Read more on: https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser#configuration
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  plugins: [
    '@typescript-eslint',
    '@stylistic',
    // "editorconfig",
    'folders',
    'import',
    // 'prettier',
    'simple-import-sort',
    'unused-imports',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
    'plugin:security/recommended-legacy',
    // "plugin:editorconfig/all",
    // "plugin:editorconfig/noconflict"
  ],
  // Read more on: https://eslint.org/docs/latest/rules/
  rules: {
    complexity: ['error', 10], // DEBT: 5
    eqeqeq: 'error',
    'max-depth': ['error', 3],
    'max-lines-per-function': ['warn', { max: 60, skipBlankLines: true, skipComments: true }],
    'max-params': ['error', 16], // DEBT: Aggregates and constructor with many parameters
    'no-console': 'warn',
    'no-prototype-builtins': 'off',
    'no-use-before-define': 'off',
    'no-var': 'error',
    'no-whitespace-before-property': ['error'],
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'warn',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',
    'prefer-template': 'error',
    yoda: 'error',
    // Plugins
    '@stylistic/array-bracket-newline': ['error'],
    '@stylistic/array-element-newline': ['error', 'consistent'],
    '@stylistic/brace-style': 'error',
    '@stylistic/comma-spacing': 'error',
    '@stylistic/computed-property-spacing': 'error',
    '@stylistic/dot-location': ['error', 'property'],
    '@stylistic/eol-last': ['error', 'always'],
    '@stylistic/function-call-argument-newline': ['error', 'consistent'],
    '@stylistic/function-call-spacing': ['error', 'never'],
    '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],
    '@stylistic/key-spacing': 'error',
    '@stylistic/keyword-spacing': 'error',
    '@stylistic/linebreak-style': ['error', 'unix'],
    '@stylistic/member-delimiter-style': 'error',
    '@stylistic/new-parens': 'error',
    '@stylistic/newline-per-chained-call': ['error'],
    '@stylistic/no-extra-parens': 'error',
    '@stylistic/no-mixed-operators': 'error',
    '@stylistic/no-multiple-empty-lines': ['error'],
    '@stylistic/no-multi-spaces': ['error'],
    '@stylistic/operator-linebreak': ['error', 'before'], // DEBT: "overrides": { "?": "before", ":": "before", "&&": "before", "||": "before" } }
    '@stylistic/space-infix-ops': 'error',
    '@stylistic/space-unary-ops': 'error',
    '@stylistic/space-before-blocks': 'error',
    '@stylistic/type-annotation-spacing': 'error',
    // arrowParents: 'always'
    '@stylistic/arrow-parens': ['error', 'always'],
    '@stylistic/arrow-spacing': 'error',
    // bracketSpacing: true
    '@stylistic/object-curly-newline': [
      'error',
      {
        ObjectExpression: { minProperties: 2, multiline: true, consistent: true },
        ObjectPattern: { minProperties: 2, multiline: true, consistent: true },
        ImportDeclaration: 'never',
        ExportDeclaration: { minProperties: 2, multiline: true, consistent: true },
      },
    ],
    '@stylistic/object-curly-spacing': ['error', 'always'],
    '@stylistic/object-property-newline': ['error'],
    // tabWidth: 2 useTabs: false printWidth: 120
    '@stylistic/indent': ['error', 2],
    '@stylistic/no-tabs': ['error'],
    '@stylistic/no-mixed-spaces-and-tabs': ['error'],
    '@stylistic/max-len': ['error', { tabWidth: 2, code: 120, ignorePattern: '^import .*', ignoreComments: true }],
    // quoteProps: 'as-needed'
    '@stylistic/quote-props': ['error', 'as-needed'],
    // trailingComma: 'all'
    '@stylistic/comma-dangle': [
      'error',
      { arrays: 'always', objects: 'always', imports: 'always', exports: 'never', functions: 'never' },
    ],
    '@stylistic/comma-style': ['error', 'last'], // default, remove
    // semi: false
    '@stylistic/semi': ['error', 'never'],
    '@stylistic/semi-style': ['error', 'last'], // default, remove
    // singleQuote: true
    '@stylistic/quotes': ['error', 'single'],
    '@typescript-eslint/array-type': 'warn',
    '@typescript-eslint/member-ordering': [
      'warn',
      {
        default: [
          // Index signature
          'signature',
          'call-signature',

          // Fields
          'public-static-field',
          'protected-static-field',
          'private-static-field',
          '#private-static-field',

          'public-decorated-field',
          'protected-decorated-field',
          'private-decorated-field',

          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
          '#private-instance-field',

          'public-abstract-field',
          'protected-abstract-field',

          'public-field',
          'protected-field',
          'private-field',
          '#private-field',

          'static-field',
          'instance-field',
          'abstract-field',

          'decorated-field',

          'field',

          // Static initialization
          'static-initialization',

          // Getters
          'public-instance-get',

          // Setters
          'public-instance-set',
          'private-instance-set',

          // Constructors
          'public-constructor',
          'protected-constructor',
          'private-constructor',

          'constructor',

          // Getters
          'public-static-get',
          'protected-static-get',
          'private-static-get',
          '#private-static-get',

          'public-decorated-get',
          'protected-decorated-get',
          'private-decorated-get',

          // "public-instance-get",
          'protected-instance-get',
          'private-instance-get',
          '#private-instance-get',

          'public-abstract-get',
          'protected-abstract-get',

          'public-get',
          'protected-get',
          'private-get',
          '#private-get',

          'static-get',
          'instance-get',
          'abstract-get',

          'decorated-get',

          'get',

          // Setters
          'public-static-set',
          'protected-static-set',
          'private-static-set',
          '#private-static-set',

          'public-decorated-set',
          'protected-decorated-set',
          'private-decorated-set',

          // "public-instance-set",
          'protected-instance-set',
          // "private-instance-set",
          '#private-instance-set',

          'public-abstract-set',
          'protected-abstract-set',

          'public-set',
          'protected-set',
          'private-set',
          '#private-set',

          'static-set',
          'instance-set',
          'abstract-set',

          'decorated-set',

          'set',

          // Methods
          'public-static-method',
          'protected-static-method',
          'private-static-method',
          '#private-static-method',

          'public-decorated-method',
          'protected-decorated-method',
          'private-decorated-method',

          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
          '#private-instance-method',

          'public-abstract-method',
          'protected-abstract-method',

          'public-method',
          'protected-method',
          'private-method',
          '#private-method',

          'static-method',
          'instance-method',
          'abstract-method',

          'decorated-method',

          'method',
        ],
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_', // use pipe (|) to add more
        ignoreRestSiblings: true,
      },
    ],
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
        argsIgnorePattern: '^_',
      },
    ],
    // kebab-case
    // 'folders/match-regex': ['error', '^[a-z-]+$', '/src/']
  },
  overrides: [
    {
      files: ['tests/**'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      rules: {
        'max-lines-per-function': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'jest/prefer-expect-assertions': 'off',
        'jest/no-standalone-expect': 'off',
        'jest/no-mocks-import': 'off',
      },
    },
  ],
}
