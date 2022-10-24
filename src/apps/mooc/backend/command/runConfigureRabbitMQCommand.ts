import '../../dependency-injection'

import { info } from '@/Contexts/Shared/infrastructure/logger'

import { ConfigureRabbitMQCommand } from './ConfigureRabbitMQCommand'

ConfigureRabbitMQCommand.run()
  .then(() => {
    info('RabbitMQ Configuration success')
    process.exit(0)
  })
  .catch((error) => {
    info('RabbitMQ Configuration fail', error)
    process.exit(1)
  })
