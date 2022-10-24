import convict from 'convict'
import { existsSync } from 'fs'
import { resolve } from 'path'

const backOfficeConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV'
  },
  app: {
    ip: {
      doc: 'The IP address to bind.',
      // format: 'ipaddress',
      default: '0.0.0.0',
      env: 'APP_IP_ADDRESS'
    },
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 8080,
      env: 'APP_PORT',
      arg: 'port'
    },
    debug: {
      doc: 'The application debug mode.',
      format: [true, false],
      default: true,
      env: 'APP_DEBUG'
    },
    name: {
      doc: 'The application name.',
      format: String,
      default: 'TS clean architecture',
      env: 'APP_NAME'
    },
    env: {
      doc: 'The application environment.',
      format: ['production', 'development', 'staging', 'test'],
      default: 'development',
      env: 'APP_ENV'
    }
  },
  mongo: {
    url: {
      doc: 'The MongoDB connection URL.',
      format: String,
      env: 'MONGO_URL',
      default: 'mongodb://127.0.0.1:27017/backoffice'
    }
  },
  sentry: {
    dsn: {
      doc: 'The Sentry connection DSN.',
      format: String,
      env: 'SENTRY_DSN'
    }
  }
})

const filePaths = [
  resolve(`${__dirname}/default.json`),
  resolve(`${__dirname}/${backOfficeConfig.get('app.env')}.json`)
].filter((path) => existsSync(path))

backOfficeConfig.loadFile(filePaths)

export default backOfficeConfig
