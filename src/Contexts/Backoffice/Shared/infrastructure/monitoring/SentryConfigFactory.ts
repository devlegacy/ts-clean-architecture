import { NodeOptions } from '@sentry/node'

import config from '../config'

const mongoConfig: NodeOptions = {
  dsn: config.get('sentry.dsn'),
  debug: config.get('app.env') !== 'production'
}

export class SentryConfigFactory {
  static createConfig(): NodeOptions {
    return mongoConfig
  }
}
