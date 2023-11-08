import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { fileURLToPath, URL } from 'node:url'

import convict from 'convict'
import convict_format_with_validator from 'convict-format-with-validator'
import dotenv from 'dotenv'
import { expand } from 'dotenv-expand'

import { info } from '@/Contexts/Shared/infrastructure/Logger/index.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const defaultPath = `../../../../../../.mooc.env`
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
        default: 'development' as 'production' | 'development' | 'staging' | 'test',
        env: 'APP_ENV',
      },
    },
    http: {
      host: {
        doc: 'The IP address to bind.',
        format: 'ipaddress',
        default: '0.0.0.0',
        env: 'HTTP_HOST',
      },
      port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 8085,
        env: 'HTTP_PORT',
        arg: 'port',
      },
    },
    // cookie: {
    //   name: {}
    // },
    log: {
      level: {
        doc: 'The application log level.',
        format: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'],
        default: 'info' as 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace',
        env: 'LOG_LEVEL',
      },
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
    aws: {
      bucket: {
        doc: 'The AWS S3 bucket name',
        format: String,
        env: 'AWS_BUCKET',
        default: '',
      },
      client: {
        region: {
          doc: 'The AWS region to which this client will send requests',
          format: String,
          env: 'AWS_DEFAULT_REGION',
          default: '',
        },
        credentials: {
          accessKeyId: {
            doc: 'AWS access key ID',
            format: String,
            env: 'AWS_ACCESS_KEY_ID',
            default: '',
          },
          secretAccessKey: {
            doc: 'AWS secret access key',
            format: String,
            env: 'AWS_SECRET_ACCESS_KEY',
            default: '',
          },
        },
      },
      cognito: {
        userPoolId: {
          doc: 'The AWS Cognito user pool id',
          format: String,
          env: 'AWS_COGNITO_USER_POOL_ID',
          default: '',
        },
        clientId: {
          doc: 'The AWS Cognito client id',
          format: String,
          env: 'AWS_COGNITO_CLIENT_ID',
          default: '',
        },
        clientSecret: {
          doc: 'The AWS Cognito client secret',
          format: String,
          env: 'AWS_COGNITO_CLIENT_SECRET',
          default: '',
        },
        groupName: {
          doc: 'The AWS Cognito group name',
          format: String,
          env: 'AWS_COGNITO_GROUP_NAME',
          default: 'user',
        },
      },
    },
    mailchimp: {
      dataCenter: {
        doc: 'The Mailchimp data center',
        format: String,
        env: 'MAILCHIMP_DATA_CENTER',
        default: '',
      },
      transactional: {
        apiKey: {
          doc: 'The Mailchimp (mandrill) transactional API key',
          format: String,
          env: 'MAILCHIMP_TRANSACTIONAL_API_KEY',
          default: '',
        },
      },
      marketing: {
        apiKey: {
          doc: 'The Mailchimp API key',
          format: String,
          env: 'MAILCHIMP_MARKETING_API_KEY',
          default: '',
        },
        audienceId: {
          doc: 'The Mailchimp audience ID also know as list ID',
          format: String,
          env: 'MAILCHIMP_MARKETING_AUDIENCE_ID',
          default: '',
        },
      },
    },
    crossmint: {
      projectId: {
        doc: 'The Crossmint project ID',
        format: String,
        env: 'CROSSMINT_PROJECT_ID',
        default: '',
      },
      clientSecret: {
        doc: 'The Crossmint client secret',
        format: String,
        env: 'CROSSMINT_CLIENT_SECRET',
        default: '',
      },
      apiUrl: {
        doc: 'The Crossmint API URL',
        format: String,
        env: 'CROSSMINT_API_URL',
        default: '',
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
