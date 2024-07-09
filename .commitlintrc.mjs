import config from '@commitlint/config-conventional'

const typeEnums = config?.rules?.['type-enum']?.at(2) || []

export default {
  extends: [
    '@commitlint/config-conventional',
  ],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        ...typeEnums,
        // 'imp', // REVIEW: Implement
        // 'update', // REVIEW: Implement
        'wip',
      ],
    ],
  },
}
