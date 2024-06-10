import {
  Collection, type Document, MongoClient, ObjectId, type WithId,
} from 'mongodb'
import {
  inject,
} from 'tsyringe'

import {
  AggregateRoot, Criteria, SHARED_TYPES,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  MongoCriteriaConverter,
} from './MongoCriteriaConverter.js'

type EntityId = string | ObjectId

export abstract class MongoRepository<T extends AggregateRoot> {
  private criteriaConverter: MongoCriteriaConverter

  constructor(@inject(SHARED_TYPES.MongoClient) private readonly _client: Promise<MongoClient>) {
    this.criteriaConverter = new MongoCriteriaConverter()
  }

  protected client(): Promise<MongoClient> {
    return this._client
  }

  protected async collection<D extends Document>(): Promise<Collection<D>> {
    const client = await this._client
    const collection = client.db().collection<D>(this.collectionName())
    return collection
  }

  protected async persist(id: EntityId, aggregateRoot: T, transform?: (...args: any[]) => any): Promise<void> {
    const collection = await this.collection()
    const _id = (ObjectId.isValid(id) ? new ObjectId(id) : id) as ObjectId
    const primitives = transform ? transform(aggregateRoot.toPrimitives()) : aggregateRoot.toPrimitives()
    const document = {
      ...primitives,
      _id,
      id: undefined,
    }

    /**
     * NOTE: Mongo interpreta undefined como null
     * al menos que se configure en la configuración para descartar al insertar
     */
    await collection.updateOne(
      {
        _id,
      },
      {
        $setOnInsert: {
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        $set: document,
      },
      {
        upsert: true,
      },
    )
  }

  protected async searchByCriteria<D extends Document>(criteria: Criteria): Promise<WithId<D>[]> {
    const query = this.criteriaConverter.convert(criteria)

    const collection = await this.collection()
    const documents = await collection
      .find<WithId<D>>(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .toArray()

    return documents
  }

  protected abstract collectionName(): string
}
