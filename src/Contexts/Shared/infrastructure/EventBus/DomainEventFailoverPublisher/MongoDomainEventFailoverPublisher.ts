import { Collection, MongoClient } from 'mongodb'

import { DomainEvent } from '@/Contexts/Shared/domain'

import { DomainEventDeserializer } from '../DomainEventDeserializer'
import { DomainEventJsonSerializer } from '../DomainEventJsonSerializer'

export class MongoDomainEventFailoverPublisher {
  static collectionName = 'DomainEvents'

  constructor(private _client: Promise<MongoClient>, private deserializer?: DomainEventDeserializer) {}

  async publish(event: DomainEvent): Promise<void> {
    const collection = await this.collection()

    const eventSerialized = DomainEventJsonSerializer.serialize(event)
    const options = { upsert: true }
    const update = {
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
    return (await this._client).db().collection(MongoDomainEventFailoverPublisher.collectionName)
  }
}
