import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { fileURLToPath, URL } from 'node:url'

import convict from 'convict'
import convict_format_with_validator from 'convict-format-with-validator'
import dotenv from 'dotenv'
import { expand } from 'dotenv-expand'

const defaultPath = `../../../../../../.user.env`
const path = existsSync(defaultPath) ? defaultPath : `${cwd()}/.env`
const envConfig = dotenv.config({
  path,
  debug: process.env.APP_DEBUG === 'true',
  override: true,
})
expand(envConfig)

convict.addFormats(convict_format_with_validator)

const config = convict({
  app: {
    env: {
      doc: 'The application environment.',
      format: ['production', 'development', 'staging', 'test'],
      default: 'development' as 'production' | 'development' | 'staging' | 'test',
      env: 'APP_ENV',
    },
  },
  mongo: {
    url: {
      doc: 'The MongoDB connection URL.',
      format: String,
      env: 'MONGO_URL',
      default: 'mongodb://127.0.0.1:27017/user',
    },
  },
})

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const filePaths = [resolve(`${__dirname}/default.json`), resolve(`${__dirname}/${config.get('app.env')}.json`)]

config.loadFile(filePaths).validate({ allowed: 'strict' })

export { config }
