import 'reflect-metadata'
import '../../modules'

import { error, fatalErrorHandler, info } from '@/Contexts/Shared/infrastructure/logger'

import { ConfigureRabbitMQCommand } from './ConfigureRabbitMQCommand'

process.on('uncaughtException', fatalErrorHandler).on('unhandledRejection', fatalErrorHandler)

ConfigureRabbitMQCommand.run()
  .then(() => {
    info('RabbitMQ Configuration success')
    process.exit(0)
  })
  .catch((err) => {
    error('RabbitMQ Configuration fail', err)
    process.exit(1)
  })
