import { Collection, MongoClient, ObjectId } from 'mongodb'
import { inject } from 'tsyringe'

import { TYPES } from '@/apps/mooc/backend/dependency-injection/types'
import { AggregateRoot } from '@/Contexts/Shared/domain'

type EntityId = string | ObjectId

export abstract class MongoRepository<T extends AggregateRoot> {
  constructor(@inject(TYPES.MongoClient) private readonly _client: Promise<MongoClient>) {}

  protected abstract collectionName(): string

  protected client(): Promise<MongoClient> {
    return this._client
  }

  protected async collection(): Promise<Collection> {
    return (await this._client).db().collection(this.collectionName())
  }

  protected async persist(id: EntityId, aggregateRoot: T, transform?: (obj: any) => any): Promise<void> {
    const collection = await this.collection()
    const _id = ObjectId.isValid(id) ? new ObjectId(id) : id
    const primitives = transform ? transform(aggregateRoot.toPrimitives()) : aggregateRoot.toPrimitives()
    const document = {
      ...primitives,
      _id,
      id: undefined
    }

    /**
     * NOTE: Mongo interpreta undefined como null
     * al menos que se configure en la configuración para descartar al insertar
     */
    await collection.updateOne(
      { _id },
      {
        $setOnInsert: {
          createdAt: new Date(),
          updatedAt: new Date()
        },
        $set: document
      },
      { upsert: true }
    )
  }
}
