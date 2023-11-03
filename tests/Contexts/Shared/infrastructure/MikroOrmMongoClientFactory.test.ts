import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'

import { MikroOrmMongoClientFactory } from '@/Contexts/Shared/infrastructure/Persistence/index.js'

describe('MikroOrmMongoClientFactory', () => {
  const factory = MikroOrmMongoClientFactory
  let client: MikroORM<MongoDriver>

  beforeEach(async () => {
    client = await factory.createClient('test', { url: 'mongodb://127.0.0.1:27017/mooc-backend-test1?' })
  })

  afterEach(async () => {
    await client.close()
  })

  it('should creates a new client with the connection already established', () => {
    expect(client).toBeInstanceOf(MikroORM)
  })

  it('should creates a new client if it does not exist a client with the given name', async () => {
    const newClient = await factory.createClient('test2', { url: 'mongodb://127.0.0.1:27017/mooc-backend-test2' })

    expect(newClient).not.toBe(client)

    await newClient.close()
  })

  it('should returns a client if it already exists', async () => {
    const newClient = await factory.createClient('test', { url: 'mongodb://127.0.0.1:27017/mooc-backend-test3' })

    expect(newClient).toBe(client)

    await newClient.close()
  })
})
