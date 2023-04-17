import 'reflect-metadata'

import { FatalErrorHandler } from '@/Contexts/Shared/infrastructure'
import { error, info } from '@/Contexts/Shared/infrastructure/Logger'

import { container } from '../../modules'
import { ConfigureRabbitMQCommand } from './ConfigureRabbitMQCommand'

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
