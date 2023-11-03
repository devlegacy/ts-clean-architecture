import 'reflect-metadata'

import { FatalErrorHandler } from '@/Contexts/Shared/infrastructure/index.js'
import { error, info } from '@/Contexts/Shared/infrastructure/Logger/index.js'

import { container } from '../../modules/index.js'
import { ConfigureRabbitMQCommand } from './ConfigureRabbitMQCommand.js'

const fatalErrorHandler = container.get(FatalErrorHandler)

process
  .on('uncaughtException', fatalErrorHandler.capture.bind(fatalErrorHandler))
  .on('unhandledRejection', fatalErrorHandler.capture.bind(fatalErrorHandler))

ConfigureRabbitMQCommand.run()
  .then(() => {
    info('RabbitMQ Configuration success')
    process.exit(0)
  })
  .catch((err) => {
    error('RabbitMQ Configuration fail', err)
    process.exit(1)
  })
