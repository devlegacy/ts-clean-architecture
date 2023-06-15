import convict from 'convict'
import convict_format_with_validator from 'convict-format-with-validator'
import dotenv from 'dotenv'
import { expand } from 'dotenv-expand'
import { existsSync } from 'fs'
import { resolve } from 'path'
import { cwd } from 'process'

import { info } from '@/Contexts/Shared/infrastructure/Logger'

const defaultPath = `${cwd()}/.mooc.env`
const path = existsSync(defaultPath) ? defaultPath : `${cwd()}/.env`
const envConfig = dotenv.config({
  path,
  debug: process.env.APP_DEBUG === 'true',
  override: true,
})
expand(envConfig)

convict.addFormats(convict_format_with_validator)
const config = convict(
  {
    app: {
      host: {
        doc: 'The IP address to bind.',
        format: 'ipaddress',
        default: '0.0.0.0',
        env: 'APP_HOST',
      },
      port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 8085,
        env: 'APP_PORT',
        arg: 'port',
      },
      debug: {
        doc: 'The application debug mode.',
        format: [true, false],
        default: true,
        env: 'APP_DEBUG',
      },
      name: {
        doc: 'The application name.',
        format: String,
        default: 'TS clean architecture',
        env: 'APP_NAME',
      },
      env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'staging', 'test'],
        default: 'development',
        env: 'APP_ENV',
      },
    },
    log: {
      level: {
        doc: 'The application log level.',
        format: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'],
        default: 'info',
        env: 'LOG_LEVEL',
      } as const,
    },
    mongo: {
      url: {
        doc: 'The MongoDB connection URL.',
        format: String,
        env: 'MONGO_URL',
        default: 'mongodb://127.0.0.1:27017/mooc',
      },
    },
    postgres: {
      host: {
        doc: 'The database host',
        format: String,
        env: 'POSTGRES_HOST',
        default: '127.0.0.1',
      },
      port: {
        doc: 'The database port',
        format: Number,
        env: 'POSTGRES_PORT',
        default: 5432,
      },
      username: {
        doc: 'The database username',
        format: String,
        env: 'POSTGRES_USERNAME',
        default: 'postgres',
      },
      password: {
        doc: 'The database password',
        format: String,
        env: 'POSTGRES_PASSWORD',
        default: 'postgres',
      },
      database: {
        doc: 'The database name',
        format: String,
        env: 'POSTGRES_DATABASE',
        default: 'mooc',
      },
    },
    sentry: {
      dsn: {
        doc: 'The Sentry connection DSN.',
        format: String,
        env: 'SENTRY_DSN',
        default: '',
      },
    },
    rabbitmq: {
      connectionSettings: {
        username: {
          doc: 'RabbitMQ username',
          format: String,
          env: 'RABBITMQ_USERNAME',
          default: 'guest',
        },
        password: {
          doc: 'RabbitMQ password',
          format: String,
          env: 'RABBITMQ_PASSWORD',
          default: 'guest',
        },
        vhost: {
          doc: 'RabbitMQ virtual host',
          format: String,
          env: 'RABBITMQ_VHOST',
          default: '/',
        },
        connection: {
          secure: {
            doc: 'RabbitMQ secure protocol',
            format: Boolean,
            env: 'RABBITMQ_SECURE',
            default: false,
          },
          hostname: {
            doc: 'RabbitMQ hostname',
            format: String,
            env: 'RABBITMQ_HOSTNAME',
            default: '127.0.0.1',
          },
          port: {
            doc: 'RabbitMQ amqp port',
            format: Number,
            env: 'RABBITMQ_PORT',
            default: 5672,
          },
        },
      },
      exchangeSettings: {
        name: {
          doc: 'RabbitMQ exchange name',
          format: String,
          env: 'RABBITMQ_EXCHANGE_NAME',
          default: 'domain_events',
        },
      },
      maxRetries: {
        doc: 'Max number of retries for each message',
        format: Number,
        env: 'RABBITMQ_MAX_RETRIES',
        default: 3,
      },
      retryTtl: {
        doc: 'Ttl for messages in the retry queue',
        format: Number,
        env: 'RABBITMQ_RETRY_TTL',
        default: 1000,
      },
    },
  }
  // {
  // env: {
  // APP_PORT: '8085',
  // APP_ENV: process.env.APP_ENV || 'development',
  // },
  // }
)

// env: {
//   doc: undefined,
//   format: undefined,
//   default: undefined,
//   env: undefined
// }

const filePaths = [resolve(`${__dirname}/default.json`), resolve(`${__dirname}/${config.get('app.env')}.json`)].filter(
  (path) => existsSync(path)
)

config.loadFile(filePaths).validate()

info(JSON.parse(config.toString()), 'mooc config')

export { config }
