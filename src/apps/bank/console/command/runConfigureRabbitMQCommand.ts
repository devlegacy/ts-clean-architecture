import 'reflect-metadata'

import {
  ConfigureRabbitMQCommand,
} from './ConfigureRabbitMQCommand.js'

ConfigureRabbitMQCommand.run()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('RabbitMQ Configuration success')
    process.exit(0)
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('RabbitMQ Configuration fail', err)
    process.exit(1)
  })
