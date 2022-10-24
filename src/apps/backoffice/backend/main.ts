import 'reflect-metadata'

import { fatalErrorHandler } from '@/Contexts/Shared/infrastructure/logger'

import { BackOfficeBackendApp } from './BackOfficeBackendApp'

process.on('uncaughtException', fatalErrorHandler).on('unhandledRejection', fatalErrorHandler)

try {
  new BackOfficeBackendApp().start().catch((e) => fatalErrorHandler(e as Error))
} catch (e) {
  fatalErrorHandler(e as Error)
}
