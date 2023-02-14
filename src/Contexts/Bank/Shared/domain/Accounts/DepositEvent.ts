import { DomainEvent } from '@/Contexts/Shared/domain'

export class DepositEvent extends DomainEvent {
  static override readonly EVENT_NAME = 'account.deposit'
  readonly balance: {
    currency: string
    amount: number
  }

  constructor({
    eventId,
    occurredOn,
    aggregateId,
    balance,
  }: {
    eventId?: string
    occurredOn?: Date
    aggregateId: string
    balance: {
      currency: string
      amount: number
    }
  }) {
    super({
      eventName: DepositEvent.EVENT_NAME,
      eventId,
      occurredOn,
      aggregateId,
    })

    this.balance = balance
  }

  static override fromPrimitives(params: {
    eventId: string
    occurredOn: Date
    aggregateId: string
    attributes: {
      balance: {
        currency: string
        amount: number
      }
    }
  }): DomainEvent {
    const { eventId, occurredOn, aggregateId, attributes } = params
    return new DepositEvent({
      eventId,
      occurredOn,
      aggregateId,
      balance: attributes.balance,
    })
  }

  toPrimitives() {
    return {
      balance: this.balance,
      type: 'DepositEvent',
    }
  }
}
