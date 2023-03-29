import 'reflect-metadata'
import 'module-alias/register'
import 'source-map-support/register'

import dotenv from 'dotenv'
import { expand } from 'dotenv-expand'
import { container } from 'tsyringe'

import { FatalErrorHandler } from '@/Contexts/Shared/infrastructure'

// import { fatalErrorHandler } from '@/Contexts/Shared/infrastructure/logger'
import { LandBackendApp } from './LandBackendApp'

const fatalErrorHandler = container.resolve(FatalErrorHandler)

process
  .on('uncaughtException', fatalErrorHandler.capture.bind(fatalErrorHandler))
  .on('unhandledRejection', fatalErrorHandler.capture.bind(fatalErrorHandler))

try {
  const config = dotenv.config()
  expand(config)

  new LandBackendApp().start().catch((e) => fatalErrorHandler.capture(e as Error))
} catch (e) {
  fatalErrorHandler.capture(e as Error)
}
