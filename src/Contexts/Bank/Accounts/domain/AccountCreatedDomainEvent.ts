import {
  DomainEvent,
} from '#@/src/Contexts/Shared/domain/index.js'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export class AccountCreatedDomainEvent extends DomainEvent {
  static override readonly EVENT_NAME = 'account.created'
  readonly name: string
  readonly balance: {
    currency: string
    amount: number
  }

  constructor({
    eventId,
    occurredOn,
    aggregateId,
    name,
    balance,
  }: {
    eventId?: string
    occurredOn?: Date
    aggregateId: string
    name: string
    balance: {
      currency: string
      amount: number
    }
  }) {
    super({
      eventName: AccountCreatedDomainEvent.EVENT_NAME,
      eventId,
      occurredOn,
      aggregateId,
    })
    this.name = name
    this.balance = balance
  }

  static override fromPrimitives(props: {
    eventId: string
    occurredOn: Date
    aggregateId: string
    attributes: {
      name: string
      balance: {
        currency: string
        amount: number
      }
    }
  }): DomainEvent {
    const {
      eventId, occurredOn, aggregateId, attributes,
    } = props
    return new AccountCreatedDomainEvent({
      eventId,
      occurredOn,
      aggregateId,
      name: attributes.name,
      balance: attributes.balance,
    })
  }

  toPrimitives() {
    return {
      name: this.name,
      balance: this.balance,
    }
  }
}
