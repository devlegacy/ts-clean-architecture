import 'reflect-metadata'

import { ConfigureRabbitMQCommand } from './ConfigureRabbitMQCommand.js'

ConfigureRabbitMQCommand.run()
  .then(() => {
    console.log('RabbitMQ Configuration success')
    process.exit(0)
  })
  .catch((err) => {
    console.error('RabbitMQ Configuration fail', err)
    process.exit(1)
  })
