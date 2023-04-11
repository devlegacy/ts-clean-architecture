import 'reflect-metadata'

import dotenv from 'dotenv'
import { expand } from 'dotenv-expand'

import { FatalErrorHandler } from '@/Contexts/Shared/infrastructure'

import { container } from '../modules'
import { MoocBackendApp } from './MoocBackendApp'

const fatalErrorHandler = container.get(FatalErrorHandler)

process
  .on('uncaughtException', fatalErrorHandler.capture.bind(fatalErrorHandler))
  .on('unhandledRejection', fatalErrorHandler.capture.bind(fatalErrorHandler))

try {
  const config = dotenv.config()
  expand(config)

  new MoocBackendApp().start().catch((e) => fatalErrorHandler.capture(e as Error))
} catch (e) {
  fatalErrorHandler.capture(e as Error)
}
