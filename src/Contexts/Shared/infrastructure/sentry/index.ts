import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

const options: Sentry.NodeOptions = {
  debug: true,
  environment: 'development',
  dsn: 'https://cc968649cee2411e91e10c5964fa75af@o914008.ingest.sentry.io/6667751',
  release: '',
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
  constructor(config?: { options: Sentry.NodeOptions }) {
    Sentry.init({
      ...options,
      ...config?.options
    })
  }

  capture(req: any, err: Error) {
    Sentry.withScope((scope) => {
      scope.setUser({
        ip_address: req.ip
      })
      scope.setTag('path', req?.raw?.url)
      Sentry.captureException(err)
    })
  }
}
