import 'reflect-metadata'

import { FatalErrorHandler } from '@/Contexts/Shared/infrastructure'

import { container } from '../modules'
import { MoocBackendApp } from './MoocBackendApp'

const fatalErrorHandler = container.get(FatalErrorHandler)

process
  .on('uncaughtException', fatalErrorHandler.capture.bind(fatalErrorHandler))
  .on('unhandledRejection', fatalErrorHandler.capture.bind(fatalErrorHandler))

try {
  new MoocBackendApp().start().catch((e) => fatalErrorHandler.capture(e as Error))
} catch (e) {
  fatalErrorHandler.capture(e as Error)
}
