import config from '@commitlint/config-conventional'
import {
  defaultConfig,
  RuleConfigSeverity,
} from 'cz-git'
// const RuleConfigSeverity = {
//   Disabled: 0,
//   Warning: 1,
//   Error: 2,
// }

const typeEnums = config?.rules?.['type-enum']?.at(2) || []

/**
 * @type {import('cz-git').UserConfig}
 */
export default {
  extends: [
    '@commitlint/config-conventional',
  ],
  rules: {
    'body-max-line-length': [
      RuleConfigSeverity.Error,
      'always',
      200,
    ],
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      [
        ...typeEnums,
        // 'imp', // REVIEW: Implement
        // 'update', // REVIEW: Implement
        'wip',
      ],
    ],
  },
  prompt: {
    useEmoji: true,
    useAI: false,
    aiNumber: 5,
    types: [
      ...defaultConfig.types,
      {
        value: 'wip',
        name: 'wip:      A work in progress feature',
        emoji: ':construction:',
      },
    ],
  },
}
