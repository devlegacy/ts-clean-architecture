import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { Service } from 'diod'

import { EnvironmentArranger } from '../arranger/EnvironmentArranger.js'

@Service()
export class MikroOrmMongoEnvironmentArranger extends EnvironmentArranger {
  #client: Promise<MikroORM<MongoDriver>>
  constructor(client: MikroORM<MongoDriver>) {
    super()
    this.#client = client as unknown as Promise<MikroORM<MongoDriver>>
  }

  async arrange(): Promise<void> {
    await this.cleanDatabase()
  }

  async close(): Promise<void> {
    const client = await this.client()
    await client.close()
  }

  protected async cleanDatabase() {
    const collections = await this.#collections()
    const client = await this.client()
    for (const collection of collections) {
      await client.config.getDriver().getConnection().getDb().collection(collection).deleteMany({})
    }
  }

  protected client() {
    return this.#client
  }

  async #collections() {
    const client = await this.client()

    const collections = await client.config
      .getDriver()
      .getConnection()
      .getDb()
      .listCollections(undefined, { nameOnly: true })
      .toArray()

    return collections.map((collection) => collection.name)
  }
}
