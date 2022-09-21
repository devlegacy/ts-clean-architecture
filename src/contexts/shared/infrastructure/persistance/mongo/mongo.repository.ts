import { Collection, MongoClient } from 'mongodb'
import { inject } from 'tsyringe'

import { AggregateRoot } from '@/Contexts/Shared/domain/aggregate-root'

export abstract class MongoRepository<T extends AggregateRoot> {
  constructor(@inject('MongoClient') private readonly _client: Promise<MongoClient>) {}

  protected abstract collectionName(): string

  protected client(): Promise<MongoClient> {
    return this._client
  }

  protected async collection(): Promise<Collection> {
    return (await this._client).db().collection(this.collectionName())
  }

  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const collection = await this.collection()

    const document = {
      ...aggregateRoot.toPrimitives(),
      _id: id,
      id: undefined
    }

    /**
     * Note: Mongo interpreta undefined como null
     * al menos que se configure en la configuración para descartar al insertar
     */
    await collection.updateOne({ _id: id }, { $set: document }, { upsert: true })
  }
}
