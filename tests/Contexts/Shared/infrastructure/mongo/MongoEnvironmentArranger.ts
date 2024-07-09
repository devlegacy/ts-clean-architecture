import {
  MongoClient,
} from 'mongodb'

import {
  EnvironmentArranger,
} from '../arranger/EnvironmentArranger.js'

export class MongoEnvironmentArranger extends EnvironmentArranger {
  constructor(private _client: Promise<MongoClient>) {
    super()
  }

  async arrange(): Promise<void> {
    await this.cleanDatabase()
  }

  async close(): Promise<void> {
    return (await this.client()).close()
  }

  protected async cleanDatabase(): Promise<void> {
    const collections = await this.collections()
    const client = await this.client()

    for (const collection of collections) {
      await client.db().collection(collection)
        .deleteMany({})
    }
  }

  protected client(): Promise<MongoClient> {
    return this._client
  }

  private async collections(): Promise<string[]> {
    const client = await this.client()
    const collections = await client.db().listCollections(undefined, {
      nameOnly: true,
    })
      .toArray()

    return collections.map((collection) => collection.name)
  }
}
