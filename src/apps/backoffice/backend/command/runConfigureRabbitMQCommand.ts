import 'reflect-metadata'
import '../../dependency-injection'

import { error, info } from '@/Contexts/Shared/infrastructure/logger'

import { ConfigureRabbitMQCommand } from './ConfigureRabbitMQCommand'

ConfigureRabbitMQCommand.run()
  .then(() => {
    info('RabbitMQ Configuration success')
    process.exit(0)
  })
  .catch((err) => {
    error('RabbitMQ Configuration fail', err)
    process.exit(1)
  })
