import { Money } from '@/Contexts/Shared/domain'
import { MongoEventStore } from '@/Contexts/Shared/infrastructure'

import { Account, AccountRepository } from '../../domain'

interface AccountDocument {
  _id: string
  name: string
  balance: {
    amount: number
    currency: string
  }
  aggregateId: string
  occurredOn: Date
  eventName: string
}

export class MongoAccountEventStore extends MongoEventStore<Account> implements AccountRepository {
  async save(account: Account): Promise<void> {
    await this.persist(account)
  }

  async update(account: Account): Promise<void> {
    await this.persist(account)
  }

  async find(id: Account['id']): Promise<Nullable<Account>> {
    const collection = await this.collection<AccountDocument>()
    const events = await collection.find({ aggregateId: id }).toArray()

    if (!events || !events.length || !events[0]) return null

    const account = new Account(id, events[0].name, new Money(events[0].balance.amount, events[0].balance.currency))
    events
      .sort((e1, e2) => e1.occurredOn.getTime() - e2.occurredOn.getTime())
      .forEach((event) => {
        const domainEventClass = this.events.get(event.eventName)
        const { _id: eventId, aggregateId, occurredOn, eventName: _eventName, ...document } = event
        // console.log(domainEventClass!.fromPrimitives, document)
        const domainEvent = domainEventClass!.fromPrimitives({
          eventId,
          aggregateId,
          occurredOn,
          // eventName,
          attributes: document,
        })
        account.handleEvent(domainEvent)
      })

    return account
  }

  protected collectionName(): string {
    return 'account_events'
  }
}
