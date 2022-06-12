import 'reflect-metadata'

import dotenv from 'dotenv'
import { expand } from 'dotenv-expand'

import { fatalErrorHandler } from '@/shared/logger'

import { BackendApp } from './backend-app'

// import { MongoDB } from '@/infrastructure/driven-adapters/mongodb'

process.on('uncaughtException', fatalErrorHandler).on('unhandledRejection', fatalErrorHandler)

try {
  const config = dotenv.config()
  expand(config)
  // const database = await MongoDB.getInstance()

  new BackendApp().start()
} catch (e) {
  fatalErrorHandler(e as Error)
}