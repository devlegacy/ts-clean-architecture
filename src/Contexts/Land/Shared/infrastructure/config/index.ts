import convict from 'convict'
import { existsSync } from 'fs'
import { resolve } from 'path'

const landConfig = convict({
  // env: {
  //   doc: 'The application environment.',
  //   format: ['production', 'development', 'staging', 'test'],
  //   default: 'development',
  //   env: 'NODE_ENV',
  // } as const,
  app: {
    host: {
      doc: 'The IP address to bind.',
      // format: 'ipaddress',
      default: '0.0.0.0',
      env: 'APP_HOST',
    },
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 8088,
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
      format: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'],
      doc: 'The application log level.',
      default: 'info',
      env: 'LOG_LEVEL',
    } as const,
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
      default: 'land',
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
  redis: {
    host: {
      doc: 'The Redis host.',
      format: String,
      env: 'REDIS_HOST',
      default: '127.0.0.1',
    },
    port: {
      doc: 'The Redis port.',
      format: Number,
      env: 'REDIS_PORT',
      default: 6379,
    },
    password: {
      doc: 'The Redis password.',
      format: String,
      env: 'REDIS_PASSWORD',
      default: '',
    },
  },
})

const filePaths = [
  resolve(`${__dirname}/default.json`),
  resolve(`${__dirname}/${landConfig.get('app.env')}.json`),
].filter((path) => existsSync(path))

landConfig.loadFile(filePaths).validate()

export default landConfig
