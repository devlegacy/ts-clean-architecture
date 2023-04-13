import { MikroORM } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'

import { MikroOrmPostgresClientFactory } from '@/Contexts/Shared/infrastructure/persistence'

const config = {
  database: 'mooc-test',
  host: '127.0.0.1',
  port: 5432,
  password: 'postgres',
  username: 'postgres',
}

describe('MikroOrmPostgresClientFactory', () => {
  const factory = MikroOrmPostgresClientFactory
  let client: MikroORM<PostgreSqlDriver>

  beforeEach(async () => {
    client = await factory.createClient('test', { ...config })
  })

  afterEach(async () => {
    await client.close()
  })

  it('should creates a new client with the connection already established', () => {
    expect(client).toBeInstanceOf(MikroORM)
  })

  it('should creates a new client if it does not exist a client with the given name', async () => {
    const newClient = await factory.createClient('test2', {
      ...config,
      database: 'mooc-test2',
    })

    expect(newClient).not.toBe(client)

    await newClient.close()
  })

  it('should returns a client if it already exists', async () => {
    const newClient = await factory.createClient('test', { ...config })

    expect(newClient).toBe(client)

    await newClient.close()
  })
})
