import { Collection, MongoClient, type UpdateFilter, type UpdateOptions } from 'mongodb'

import { DomainEvent } from '@/Contexts/Shared/domain/index.js'

import { DomainEventDeserializer } from '../DomainEventDeserializer.js'
import { DomainEventJsonSerializer } from '../DomainEventJsonSerializer.js'

export class MongoDomainEventFailoverPublisher {
  static collectionName = 'DomainEvents'

  constructor(
    private readonly _client: Promise<MongoClient>,
    private readonly deserializer?: DomainEventDeserializer,
  ) {}

  async publish(event: DomainEvent): Promise<void> {
    const collection = await this.collection()

    const eventSerialized = DomainEventJsonSerializer.serialize(event)
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

    const events = documents.map((document) => this.deserializer!.deserialize(document.event))

    return events.filter(Boolean)
  }

  protected async collection(): Promise<Collection> {
    const client = await this._client
    return client.db().collection(MongoDomainEventFailoverPublisher.collectionName)
  }
}
