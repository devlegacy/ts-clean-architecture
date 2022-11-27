import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import { resolve } from 'path'
import { cwd } from 'process'

// eslint-disable-next-line security/detect-non-literal-require, @typescript-eslint/no-var-requires
const packageJson: Record<string, string> = require(resolve(cwd(), './package.json'))

const options: Sentry.NodeOptions = {
  debug: true,
  environment: 'development',
  dsn: 'https://cc968649cee2411e91e10c5964fa75af@o914008.ingest.sentry.io/6667751',
  release: packageJson.version,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Mongo({
      useMongoose: false // Default: false
    })
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
}

export class SentryModule {
  static #options: Sentry.NodeOptions
  private constructor() {
    // do nothing
  }

  static capture(err: Error, config?: { options?: Sentry.NodeOptions; req?: any }) {
    this.#options = {
      ...options,
      ...config?.options
    }

    Sentry.init(this.#options)

    Sentry.withScope((scope) => {
      const transaction = Sentry.startTransaction({
        name: `Transaction ${Date.now()}`,
        op: SentryModule.#options.environment
      })
      scope.setUser({
        ip_address: config?.req.ip
      })
      scope.setTag('path', config?.req?.raw?.url)
      Sentry.captureException(err)
      transaction.finish()
    })
  }
}
