import {
  type IncomingMessage,
} from 'node:http'
import {
  resolve,
} from 'node:path'
import {
  cwd,
  env,
} from 'node:process'
import {
  pathToFileURL,
} from 'node:url'

import * as Sentry from '@sentry/node'
import {
  nodeProfilingIntegration,
} from '@sentry/profiling-node'
import {
  UAParser,
} from 'ua-parser-js'

import {
  Monitoring,
} from '../../../domain/index.js'

const path = pathToFileURL(resolve(
  cwd(),
  './package.json',
)).toString()

const {
  default: packageJson,
}: { default: Record<string, string> } = await import(path, {
  with: {
    type: 'json',
  },
})

const options: Sentry.NodeOptions = {
  debug: env.APP_ENV !== 'production',
  environment: env.APP_ENV || 'development',
  release: packageJson.version,
  integrations: [
    // Sentry.httpIntegration(),
    // Sentry.fastifyIntegration(),
    // Sentry.modulesIntegration(),
    // Sentry.functionToStringIntegration(),
    nodeProfilingIntegration(),
    // Sentry.onUncaughtExceptionIntegration(),
    // Sentry.onUnhandledRejectionIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
}

type HttpRequest<T extends IncomingMessage = IncomingMessage> = T & {
  user: Record<string, any>
  body: unknown
  query: unknown
  params: unknown
}

export class SentryMonitoring implements Monitoring {
  #options: Sentry.NodeOptions

  constructor(config?: Sentry.NodeOptions) {
    this.#options = {
      ...options,
      ...config,
    }

    Sentry.init(this.#options)

    // TODO: Implement Fastify integration
    // Sentry.setupFastifyErrorHandler(app)
  }

  capture(err: Error, config?: { req: HttpRequest }) {
    // eslint-disable-next-line complexity
    Sentry.withScope((scope) => {
      // const transaction = Sentry.startTransaction({
      //   name: `Transaction ${Date.now()}`,
      //   op: this.#options.environment,
      // })
      // scope.setTransactionName((err as any)?.code || err.message || 'unknown')
      scope.setTag('code', (err as any)?.code || err?.name || 'unknown')
      scope.setTag('name', (err as any)?.code || err?.name || 'unknown')
      if (config?.req) {
        scope.setUser({
          id: config?.req?.user?.id,
          email: config?.req?.user?.email,
          username: config?.req?.user?.username,
          ip_address: config?.req?.socket?.remoteAddress,
        })
        if (config?.req?.method) {
          scope.setTag(
            'method',
            config?.req?.method,
          )
        }
        if (config?.req?.url) {
          scope.setTag(
            'url',
            config?.req?.url,
          )
        }
        if (config?.req?.headers?.['user-agent']) {
          const userAgentParser = new UAParser(config?.req?.headers?.['user-agent'])
          const userAgentResult = userAgentParser.getResult()
          scope.setContext(
            'device',
            {
              userAgent: config?.req?.headers?.['user-agent'] || '',
              browser: userAgentResult.browser,
              os: userAgentResult.os,
              device: userAgentResult.device,
            },
          )
          scope.setTag(
            'browser',
            userAgentResult.browser.name,
          )
          scope.setTag(
            'os',
            userAgentResult.os.name,
          )
        }
        scope.setExtras({
          url: config?.req?.url,
          method: config?.req?.method,
          headers: config?.req?.headers,
          body: config?.req?.body,
          query: config?.req?.query,
          params: config?.req?.params,
        })
      }

      // scope.setClient()
      // scope.setRequestSession({})

      // transform domain error name to type
      if (err instanceof Error && err.name && (err as any).code) {
        err.name = (err as any).code
      }
      Sentry.captureException(err)
      // transaction.finish()
    })
  }
}
