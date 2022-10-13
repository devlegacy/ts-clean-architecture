import 'reflect-metadata'

import { fatalErrorHandler } from '@qualy/logger'

import { MoocBackendApp } from './MoocBackendApp'

process.on('uncaughtException', fatalErrorHandler).on('unhandledRejection', fatalErrorHandler)

try {
  new MoocBackendApp().start()
} catch (e) {
  fatalErrorHandler(e as Error)
}
