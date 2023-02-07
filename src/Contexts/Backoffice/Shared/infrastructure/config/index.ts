import convict from 'convict'
import { existsSync } from 'fs'
import { resolve } from 'path'

const backOfficeConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV',
  },
  app: {
    ip: {
      doc: 'The IP address to bind.',
      // format: 'ipaddress',
      default: '0.0.0.0',
      env: 'APP_IP_ADDRESS',
    },
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 8082,
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
    },
  },
  mongo: {
    url: {
      doc: 'The MongoDB connection URL.',
      format: String,
      env: 'MONGO_URL',
      default: 'mongodb://127.0.0.1:27017/backoffice',
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
          default: 'localhost',
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
  elastic: {
    url: {
      doc: 'The Elastic connection URL',
      format: String,
      env: 'ELASTIC_URL',
      default: 'http://localhost:9200',
    },
    indexName: {
      doc: 'The Elastic index name for this context',
      format: String,
      env: 'ELASTIC_INDEX_NAME',
      default: 'backofficecourses',
    },
    config: {
      doc: 'The Elastic config for this context',
      format: '*',
      env: 'ELASTIC_CONFIG',
      default: {
        settings: {
          index: {
            number_of_replicas: 0, // for local development
          },
        },
        mappings: {
          properties: {
            id: {
              type: 'keyword',
              index: true,
            },
            name: {
              type: 'text',
              index: true,
              fielddata: true,
            },
            duration: {
              type: 'text',
              index: true,
              fielddata: true,
            },
          },
        },
      },
    },
  },
})

const filePaths = [
  resolve(`${__dirname}/default.json`),
  resolve(`${__dirname}/${backOfficeConfig.get('app.env')}.json`),
].filter((path) => existsSync(path))

backOfficeConfig.loadFile(filePaths)

export default backOfficeConfig
