import 'reflect-metadata'

import dotenv from 'dotenv'
import { expand } from 'dotenv-expand'

import { BankBackendApp } from './BankBackendApp'

process.on('uncaughtException', (e, origin) => console.log(e, origin)).on('unhandledRejection', (e) => console.log(e))

try {
  const config = dotenv.config()
  expand(config)

  new BankBackendApp().start().catch((e: unknown) => console.log(e))
} catch (e: unknown) {
  console.log(e)
}
