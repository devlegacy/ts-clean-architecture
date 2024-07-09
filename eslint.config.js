import {
  dirname,
} from 'node:path'
import {
  fileURLToPath,
} from 'node:url'

// backward compatibility ⚠️
import {
  fixupPluginRules,
} from '@eslint/compat'
// backward compatibility ⚠️
import {
  FlatCompat,
} from '@eslint/eslintrc'
import eslint from '@eslint/js'
// https://github.com/eslint-stylistic/eslint-stylistic
import stylistic from '@stylistic/eslint-plugin'
// https://github.com/import-js/eslint-plugin-import/issues/2948 🔴
// import eslintImport from 'eslint-plugin-import'
// https://github.com/eslint-community/eslint-plugin-security
import security from 'eslint-plugin-security'
// https://github.com/lydell/eslint-plugin-simple-import-sort
import simpleImportSort from 'eslint-plugin-simple-import-sort'
// https://github.com/sweepline/eslint-plugin-unused-imports
import unusedImports from 'eslint-plugin-unused-imports'
// https://github.com/sindresorhus/globals
import globals from 'globals'
// https://github.com/typescript-eslint/typescript-eslint/issues/8211 🔴
// https://www.npmjs.com/package/typescript-eslint?activeTab=versions 🔍
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// backward compatibility ⚠️
const compat = new FlatCompat()
/**
 * backward compatibility ⚠️
 * @param {string} name the plugin name
 * @param {string} alias the plugin alias
 * @returns {import("eslint").ESLint.Plugin}
 */
function legacyPlugin(name, alias = name) {
  const plugin = compat.plugins(name)[0]?.plugins?.[alias]

  if (!plugin) {
    throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`)
  }

  return fixupPluginRules(plugin)
}

/**
 * Read more on: https://eslint.org/docs/latest/rules/
 */
const eslintRules = {
  // REVIEW: Assess the effectiveness and necessity of this rule with a value of 5 or 10.
  complexity: [
    'error',
    10,
  ],
  eqeqeq: 'error',
  'max-depth': [
    'error',
    3,
  ],
  // REVIEW: Assess the usefulness of this rule with the current configuration.
  'max-lines-per-function': [
    'warn',
    {
      max: 60,
      skipBlankLines: true,
      skipComments: true,
    },
  ],
  // REVIEW: Assess the usefulness of this rule, especially for aggregates and constructors with many parameters.
  'max-params': [
    'error',
    16,
  ],
  'no-console': 'error',
  'no-var': 'error',
  'no-whitespace-before-property': 'error',
  'object-shorthand': 'error',
  'prefer-const': 'error',
  'prefer-destructuring': 'warn',
  'prefer-rest-params': 'warn',
  'prefer-spread': 'warn',
  'prefer-template': 'error',
  yoda: 'error',
}
const typescriptRules = {
  '@typescript-eslint/array-type': 'warn',
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-unnecessary-type-assertion': 'error',
  'no-use-before-define': 'off',
  '@typescript-eslint/no-use-before-define': 'error',
}
const stylisticCustomConfig = stylistic.configs.customize({
  jsx: false,
  arrowParens: true,
  braceStyle: '1tbs',
})
const stylisticRules = {
  ...stylisticCustomConfig.rules,
  '@stylistic/array-bracket-newline': [
    'error',
    {
      minItems: 1,
    },
  ],
  '@stylistic/array-element-newline': [
    'error',
    'always',
  ],
  // REVIEW: Assess the usefulness of this rule with the current configuration.
  // '@stylistic/function-call-argument-newline': [
  //   'error',
  //   'always',
  // ],
  '@stylistic/function-call-spacing': [
    'error',
    'never',
  ],
  '@stylistic/function-paren-newline': [
    'error',
    'multiline-arguments',
  ],
  '@stylistic/linebreak-style': [
    'error',
    'unix',
  ],
  '@stylistic/newline-per-chained-call': [
    'error',
  ],
  '@stylistic/object-curly-newline': [
    'error',
    {
      ObjectExpression: {
        minProperties: 1,
        multiline: true,
        consistent: true,
      },
      ObjectPattern: {
        minProperties: 1,
        multiline: true,
        consistent: true,
      },
      ImportDeclaration: {
        multiline: true,
        minProperties: 1,
        consistent: true,
      },
      ExportDeclaration: {
        minProperties: 1,
        multiline: true,
        consistent: true,
      },
    },
  ],
  // '@stylistic/object-property-newline': [
  //   'error',
  // ],
  // '@stylistic/max-len': [
  //   'error',
  //   {
  //     tabWidth: 2,
  //     code: 100,
  //     ignoreComments: true,
  //     ignorePattern: '(import .*|from .*)',
  //     ignoreUrls: true,
  //   },
  // ],
  /** @override */
  '@stylistic/quote-props': [
    'error',
    'as-needed',
  ],
  /** @override */
  '@stylistic/comma-dangle': [
    'error',
    {
      arrays: 'always',
      objects: 'always',
      imports: 'always',
      exports: 'never',
      functions: 'always-multiline',
    },
  ],
  /** @ignore to be defined */
  // '@stylistic/semi-style': [
  //   'error',
  //   'last',
  // ],
}
/**
 * tseslint + eslint
 */
const tseslintConfig = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: [
      '**/*.ts',
      '**/*.mts',
      // '**/*.js',
      // '**/*.mjs',
      // '**/*.cjs',
    ],
    // ignores: [
    //   '**/*.cjs',
    // ],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      globals: globals.node,
      // Read more on: https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser#configuration
      parserOptions: {
        ecmaVersion: 'latest',
        projectService: {
          allowDefaultProject: [
            './*.js',
            './*.cjs',
            './*.mjs',
          ],
          defaultProject: './tsconfig.json',
        },
        sourceType: 'module',
        tsconfigDirName: import.meta.dirname,
        tsconfigRootDir: __dirname,
      },
      sourceType: 'module',
    },
  },
  {
    rules: eslintRules,
  },
  {
    rules: typescriptRules,
  },
  // rules for js files
  {
    files: [
      '**/*.js',
      '**/*.cjs',
      '**/*.mjs',
    ],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      ...tseslint.configs.disableTypeChecked.languageOptions,
      ecmaVersion: 'latest',
      globals: globals.node,
    },
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
      ...eslintRules,
    },
  },
  {
    files: [
      '**/*.cjs',
    ],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
)

const stylisticConfig = [
  {
    ...stylisticCustomConfig,
    rules: stylisticRules,
  },
  {
    files: [
      'tests/**/*.test.ts',
      'tests/**/*.steps.ts',
    ],
    rules: {
      // REVIEW: Assess the usefulness of this rule with the current configuration.
      // '@stylistic/function-call-argument-newline': 'off',
    },
  },
]

const simpleImportConfig = {
  plugins: {
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
}

const importConfig = {
  plugins: {
    import: legacyPlugin(
      'eslint-plugin-import',
      'import',
    ),
  },
  rules: {
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
}

const unusedImportsConfig = {
  plugins: {
    'unused-imports': unusedImports,
  },
  rules: {
    /** @override */
    'no-unused-vars': 'off',
    /** @override */
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
}

// console.log({
//   ...tseslint.configs.disableTypeChecked,
//   languageOptions: {
//     ...tseslint.configs.disableTypeChecked.languageOptions,
//     ecmaVersion: 'latest',
//     globals: globals.node,
//   },
//   rules: {
//     ...tseslint.configs.disableTypeChecked.rules,
//     ...eslintRules,
//   },
// })

/**
 * Packages to review:
 * - standard-with-typescript
 * - eslint-plugin-n
 * - eslint-plugin-promise
 * - eslint-config-standard-with-typescript
 * - eslint-plugin-import
 *
 * `npx eslint --print-config ./eslint.config.js`
 * @type {import('eslint').Linter.Config.FlatConfig[]}
 */
const config = [
  ...tseslintConfig,
  ...stylisticConfig,
  security.configs.recommended,
  simpleImportConfig,
  importConfig,
  unusedImportsConfig,
]

export default config
