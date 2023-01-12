import 'reflect-metadata'

import { fatalErrorHandler } from '@/Contexts/Shared/infrastructure/Logger'

import { UserBackendApp } from './UserBackendApp'

process.on('uncaughtException', fatalErrorHandler).on('unhandledRejection', fatalErrorHandler)

try {
  new UserBackendApp().start()
} catch (e) {
  fatalErrorHandler(e as Error)
}
