import 'reflect-metadata'

import { fatalErrorHandler } from '@/Contexts/Shared/infrastructure/logger'

import { UserGraphQLApp } from './UserGraphQLApp'

process.on('uncaughtException', fatalErrorHandler).on('unhandledRejection', fatalErrorHandler)

try {
  new UserGraphQLApp().start()
} catch (e) {
  fatalErrorHandler(e as Error)
}
