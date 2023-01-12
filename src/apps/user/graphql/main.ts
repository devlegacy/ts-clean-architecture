import 'reflect-metadata'

import { container } from 'tsyringe'

import { FatalErrorHandler } from '@/Contexts/Shared/infrastructure'

import { UserGraphQLApp } from './UserGraphQLApp'

const fatalErrorHandler = container.resolve(FatalErrorHandler)

process
  .on('uncaughtException', fatalErrorHandler.capture.bind(fatalErrorHandler))
  .on('unhandledRejection', fatalErrorHandler.capture.bind(fatalErrorHandler))

try {
  new UserGraphQLApp().start().catch((e) => fatalErrorHandler.capture(e))
} catch (e) {
  fatalErrorHandler.capture(e as Error)
}
