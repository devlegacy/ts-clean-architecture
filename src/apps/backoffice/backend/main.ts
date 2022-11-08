import 'reflect-metadata'

import dotenv from 'dotenv'
import { expand } from 'dotenv-expand'

import { fatalErrorHandler } from '@/Contexts/Shared/infrastructure/logger'

import { BackofficeBackendApp } from './BackofficeBackendApp'

process.on('uncaughtException', fatalErrorHandler).on('unhandledRejection', fatalErrorHandler)

try {
  const config = dotenv.config()
  expand(config)

  new BackofficeBackendApp().start().catch((e) => fatalErrorHandler(e as Error))
} catch (e) {
  fatalErrorHandler(e as Error)
}
