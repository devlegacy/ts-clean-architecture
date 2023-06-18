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
    ecmaVersion: 'latest',
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
        ignoreTemplateLiterals: true,
        ignorePattern: '^import .*'
      }
    ], // .prettierrc helps
    'max-lines-per-function': ['warn', { max: 60, skipBlankLines: true, skipComments: true }],
    'max-params': ['error', 16],
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
    '@typescript-eslint/member-ordering': ['warn', {
      "default": [
        // Index signature
        "signature",
        "call-signature",

        // Fields
        "public-static-field",
        "protected-static-field",
        "private-static-field",
        "#private-static-field",

        "public-decorated-field",
        "protected-decorated-field",
        "private-decorated-field",

        "public-instance-field",
        "protected-instance-field",
        "private-instance-field",
        "#private-instance-field",

        "public-abstract-field",
        "protected-abstract-field",

        "public-field",
        "protected-field",
        "private-field",
        "#private-field",

        "static-field",
        "instance-field",
        "abstract-field",

        "decorated-field",

        "field",

        // Static initialization
        "static-initialization",

        // Getters
        "public-instance-get",

        // Setters
        "public-instance-set",
        "private-instance-set",

        // Constructors
        "public-constructor",
        "protected-constructor",
        "private-constructor",

        "constructor",

        // Getters
        "public-static-get",
        "protected-static-get",
        "private-static-get",
        "#private-static-get",

        "public-decorated-get",
        "protected-decorated-get",
        "private-decorated-get",

        // "public-instance-get",
        "protected-instance-get",
        "private-instance-get",
        "#private-instance-get",

        "public-abstract-get",
        "protected-abstract-get",

        "public-get",
        "protected-get",
        "private-get",
        "#private-get",

        "static-get",
        "instance-get",
        "abstract-get",

        "decorated-get",

        "get",

        // Setters
        "public-static-set",
        "protected-static-set",
        "private-static-set",
        "#private-static-set",

        "public-decorated-set",
        "protected-decorated-set",
        "private-decorated-set",

        // "public-instance-set",
        "protected-instance-set",
        // "private-instance-set",
        "#private-instance-set",

        "public-abstract-set",
        "protected-abstract-set",

        "public-set",
        "protected-set",
        "private-set",
        "#private-set",

        "static-set",
        "instance-set",
        "abstract-set",

        "decorated-set",

        "set",

        // Methods
        "public-static-method",
        "protected-static-method",
        "private-static-method",
        "#private-static-method",

        "public-decorated-method",
        "protected-decorated-method",
        "private-decorated-method",

        "public-instance-method",
        "protected-instance-method",
        "private-instance-method",
        "#private-instance-method",

        "public-abstract-method",
        "protected-abstract-method",

        "public-method",
        "protected-method",
        "private-method",
        "#private-method",

        "static-method",
        "instance-method",
        "abstract-method",

        "decorated-method",

        "method"
      ]
    }],
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
        'jest/no-mocks-import': 'off'
      }
    }
  ]
}
