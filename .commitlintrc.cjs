const config = require('@commitlint/config-conventional')

const typeEnums = config.rules['type-enum']?.[2] || []

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        ...typeEnums,
        // 'imp',
        // 'update',
        'wip',
      ],
    ],
  },
}
