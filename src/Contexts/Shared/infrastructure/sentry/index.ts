import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import { resolve } from 'path'
import { cwd } from 'process'
import { pathToFileURL } from 'url'

const packageJson: Record<string, string> = await import(pathToFileURL(resolve(cwd(), './package.json')).href, {
  assert: { type: 'json' }
})

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
  #options: Sentry.NodeOptions
  constructor(config?: { options: Sentry.NodeOptions }) {
    this.#options = {
      ...options,
      ...config?.options
    }

    Sentry.init(this.#options)
  }

  capture(req: any, err: Error) {
    Sentry.withScope((scope) => {
      const transaction = Sentry.startTransaction({
        name: `Transaction ${Date.now()}`,
        op: this.#options.environment
      })
      scope.setUser({
        ip_address: req.ip
      })
      scope.setTag('path', req?.raw?.url)
      Sentry.captureException(err)
      transaction.finish()
    })
  }
}
