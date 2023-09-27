import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import type { Document } from 'bson'
import { Collection, type UpdateFilter, type UpdateOptions } from 'mongodb'

import { DomainEvent } from '@/Contexts/Shared/domain/index.js'

import { DomainEventDeserializer } from '../DomainEventDeserializer.js'
import { DomainEventJsonSerializer } from '../DomainEventJsonSerializer.js'

/**
 * NOTE: Infrastructure to Infrastructure coupling
 * MongoDomainEventFailoverPublisher
 * MikroOrmMongoDomainEventFailoverPublisher
 * Reactivo a errores
 */
export class MikroOrmMongoDomainEventFailoverPublisher {
  static collectionName = 'DomainEvents'
  #client: Promise<MikroORM<MongoDriver>>
  #deserializer?: DomainEventDeserializer
  constructor(client: Promise<MikroORM<MongoDriver>>, deserializer?: DomainEventDeserializer) {
    this.#client = client
    this.#deserializer = deserializer
  }

  async publish(event: DomainEvent): Promise<void> {
    const collection = await this.collection()

    const eventSerialized = DomainEventJsonSerializer.serialize(event)
    // avoid duplications with $set update
    const options: UpdateOptions = { upsert: true }
    const update: UpdateFilter<DomainEvent> = {
      $set: {
        eventId: event.eventId,
        event: eventSerialized,
      },
    }

    await collection.updateOne({ eventId: event.eventId }, update, options)
  }

  async consume(): Promise<DomainEvent[]> {
    const collection = await this.collection()
    const documents = await collection.find().limit(200).toArray()

    const events = documents.map((document) => this.#deserializer!.deserialize(document.event))

    return events.filter(Boolean)
  }

  protected async collection(): Promise<Collection<Document>> {
    const client = await this.#client
    const collection = client.config
      .getDriver()
      .getConnection()
      .getDb()
      .collection(MikroOrmMongoDomainEventFailoverPublisher.collectionName)

    return collection as unknown as Collection<Document>
  }
}
