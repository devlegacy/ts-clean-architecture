import type {
  NodeOptions,
} from '@sentry/node'

import {
  config,
} from '../config/index.js'

const sentryConfig: NodeOptions = {
  dsn: config.get('sentry.dsn'),
  debug: config.get('app.env') !== 'production',
}

export class SentryConfigFactory {
  static createConfig(): NodeOptions {
    return sentryConfig
  }
}
