import { Collection, type Document, MongoClient, ObjectId } from 'mongodb'
import { inject } from 'tsyringe'

import { AggregateRoot, type DomainEventClass, SHARED_TYPES } from '@/Contexts/Shared/domain/index.js'

export abstract class MongoEventStore<T extends AggregateRoot> {
  protected readonly events: Map<string, DomainEventClass>

  // private criteriaConverter: MongoCriteriaConverter

  constructor(@inject(SHARED_TYPES.MongoClient) private readonly _client: Promise<MongoClient>) {
    // this.criteriaConverter = new MongoCriteriaConverter()
    this.events = new Map<string, DomainEventClass>()
  }

  async findMany(): Promise<T[]> {
    return []
  }

  async clear() {
    return
  }
  protected client(): Promise<MongoClient> {
    return this._client
  }

  protected async collection<D extends Document>(): Promise<Collection<D>> {
    const client = await this._client
    const collection = client.db().collection<D>(this.collectionName())
    return collection
  }

  protected async persist(aggregateRoot: T): Promise<void> {
    const collection = await this.collection()

    const events = aggregateRoot.domainEvents.map(async (event) => {
      this.events.set(event.eventName, event.constructor as unknown as DomainEventClass)

      const id = event.eventId
      const _id = (ObjectId.isValid(id) ? new ObjectId(id) : id) as ObjectId
      const primitives = event.toPrimitives()
      const document = {
        ...primitives,
        _id,
        id: undefined,
        eventName: event.eventName,
        // eventId: id,
        occurredOn: event.occurredOn,
        aggregateId: event.aggregateId,
      }

      // const query =
      await collection.updateOne(
        { _id },
        {
          $setOnInsert: {
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          $set: document,
        },
        { upsert: true }
      )
      return
    })

    await Promise.all(events)
  }

  protected abstract collectionName(): string
}
