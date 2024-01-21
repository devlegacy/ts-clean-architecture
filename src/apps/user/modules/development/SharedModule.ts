import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { ContainerBuilder } from 'diod'

import { Logger, Monitoring } from '@/Contexts/Shared/domain/index.js'
import { FatalErrorHandler, MikroOrmMongoClientFactory } from '@/Contexts/Shared/infrastructure/index.js'
import { PinoLogger } from '@/Contexts/Shared/infrastructure/Logger/index.js'
import { MongoConfigFactory } from '@/Contexts/User/Shared/infrastructure/index.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const context = 'user'

const mongoConfig = MongoConfigFactory.createConfig()
const connectionClient = await MikroOrmMongoClientFactory.createClient(
  context,
  mongoConfig,
  resolve(`${__dirname}/../../../../Contexts/User`),
)
const monitoring = {} as Monitoring //new SentryModule({ options: SentryConfigFactory.createConfig() })
const logger = new PinoLogger({
  name: 'user',
  level: 'info',
})

export const SharedModule = (builder: ContainerBuilder) => {
  builder.register<MikroORM<MongoDriver>>(MikroORM<MongoDriver>).useFactory(() => connectionClient)
  builder
    .register(Monitoring)
    .useFactory(() => monitoring)
    .asSingleton()
  builder
    .register(Logger)
    .useFactory(() => logger)
    .asSingleton()
  builder.register(FatalErrorHandler).use(FatalErrorHandler).asSingleton()
  // builder.registerAndUse(FatalErrorHandler).asSingleton()
}
