import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { pathToFileURL } from 'node:url'

import * as Sentry from '@sentry/node'
import { ProfilingIntegration } from '@sentry/profiling-node'
import UAParser from 'ua-parser-js'

import { Monitoring } from '../../../domain/index.js'

const path = pathToFileURL(resolve(cwd(), './package.json')).toString()
const { default: packageJson }: { default: Record<string, string> } = await import(path, { assert: { type: 'json' } })

const options: Sentry.NodeOptions = {
  debug: true,
  environment: 'development',
  release: packageJson.version,
  integrations: [new ProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
}

export class SentryMonitoring implements Monitoring {
  #options: Sentry.NodeOptions

  constructor(config?: Sentry.NodeOptions) {
    this.#options = {
      ...options,
      ...config,
    }

    Sentry.init(this.#options)
  }

  capture(err: Error, config?: { req: any }) {
    Sentry.withScope((scope) => {
      // const transaction = Sentry.startTransaction({
      //   name: `Transaction ${Date.now()}`,
      //   op: this.#options.environment,
      // })
      if (config?.req) {
        scope.setUser({
          id: config?.req?.user?.id,
          email: config?.req?.user?.email,
          username: config?.req?.user?.username,
          ip_address: config?.req?.socket?.remoteAddress,
        })
        if (config?.req?.method) {
          scope.setTag('method', config?.req?.method)
        }
        if (config?.req?.url) {
          scope.setTag('url', config?.req?.url)
        }
        if (config?.req?.headers?.['user-agent']) {
          const userAgentParser = new UAParser(config?.req?.headers?.['user-agent'])
          const userAgentResult = userAgentParser.getResult()
          scope.setContext('device', {
            userAgent: config?.req?.headers?.['user-agent'] || '',
            browser: userAgentResult.browser,
            os: userAgentResult.os,
            device: userAgentResult.device,
          })
          scope.setTag('browser', userAgentResult.browser.name)
          scope.setTag('os', userAgentResult.os.name)
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

      Sentry.captureException(err)
      // transaction.finish()
    })
  }
}
