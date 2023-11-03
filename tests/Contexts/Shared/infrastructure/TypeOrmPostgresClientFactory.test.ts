import { DataSource } from 'typeorm'

import { TypeOrmPostgresClientFactory } from '@/Contexts/Shared/infrastructure/Persistence/index.js'

const config = {
  database: 'mooc-test',
  host: '127.0.0.1',
  port: 5432,
  password: 'postgres',
  username: 'postgres',
}
jest.setTimeout(5000 + 600000)
describe('TypeOrmPostgresClientFactory', () => {
  const factory = TypeOrmPostgresClientFactory
  let client: DataSource

  beforeEach(async () => {
    client = await factory.createClient('mooc-test', config)
  })

  afterEach(async () => {
    // TODO: This a hack, should be improved
    if (client && client.isInitialized) {
      await client.destroy()
    }
  })

  it('should creates a new client with the connection already established', () => {
    expect(client).toBeInstanceOf(DataSource)
  })

  it('should creates a new client if it does not exist a client with the given name', async () => {
    const newClient = await factory.createClient('mooc-test2', {
      ...config,
      database: 'mooc-test2',
    })

    expect(newClient).not.toBe(client)

    await newClient.destroy()
  })

  it('should returns a client if it already exists', async () => {
    const newClient = await factory.createClient('mooc-test', config)

    expect(newClient).toBe(client)

    await newClient.destroy()
  })
})
