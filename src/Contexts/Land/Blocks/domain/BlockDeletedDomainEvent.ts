import {
  DomainEvent,
} from '#@/src/Contexts/Shared/domain/index.js'

type DeleteBlockDomainEventAttributes = {
  readonly block: string
  readonly area: number
  readonly street: string
  readonly availability: string
  readonly northBoundary: string
  readonly northeastBoundary: string
  readonly eastBoundary: string
  readonly southeastBoundary: string
  readonly southBoundary: string
  readonly southwestBoundary: string
  readonly westBoundary: string
  readonly northwestBoundary: string
  readonly deletedAt?: Date
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export class BlockDeletedDomainEvent extends DomainEvent {
  static override readonly EVENT_NAME = 'block.deleted'

  readonly block: string
  readonly area: number
  readonly street: string
  readonly availability: string
  readonly northBoundary: string
  readonly northeastBoundary: string
  readonly eastBoundary: string
  readonly southeastBoundary: string
  readonly southBoundary: string
  readonly southwestBoundary: string
  readonly westBoundary: string
  readonly northwestBoundary: string
  readonly deletedAt?: Date

  constructor({
    aggregateId,
    eventId,
    occurredOn,
    block,
    area,
    street,
    availability,
    northBoundary,
    northeastBoundary,
    eastBoundary,
    southeastBoundary,
    southBoundary,
    southwestBoundary,
    westBoundary,
    northwestBoundary,
    deletedAt,
  }: {
    aggregateId: string
    eventId?: string
    occurredOn?: Date
    block: string
    street: string
    availability: string
    area: number
    northBoundary: string
    northeastBoundary: string
    eastBoundary: string
    southeastBoundary: string
    southBoundary: string
    southwestBoundary: string
    westBoundary: string
    northwestBoundary: string
    deletedAt?: Date
  }) {
    super({
      aggregateId,
      eventName: BlockDeletedDomainEvent.EVENT_NAME,
      eventId,
      occurredOn,
    })
    this.block = block
    this.area = area
    this.street = street
    this.availability = availability
    this.northBoundary = northBoundary
    this.northeastBoundary = northeastBoundary
    this.eastBoundary = eastBoundary
    this.southeastBoundary = southeastBoundary
    this.southBoundary = southBoundary
    this.southwestBoundary = southwestBoundary
    this.westBoundary = westBoundary
    this.northwestBoundary = northwestBoundary
    this.deletedAt = deletedAt
  }

  static override fromPrimitives(params: {
    aggregateId: string
    attributes: DeleteBlockDomainEventAttributes
    eventId: string
    occurredOn: Date
  }): DomainEvent {
    const {
      aggregateId, attributes, occurredOn, eventId,
    } = params
    return new BlockDeletedDomainEvent({
      aggregateId,
      block: attributes.block,
      area: attributes.area,
      street: attributes.street,
      availability: attributes.availability,
      northBoundary: attributes.northBoundary,
      northeastBoundary: attributes.northeastBoundary,
      eastBoundary: attributes.eastBoundary,
      southeastBoundary: attributes.southeastBoundary,
      southBoundary: attributes.southBoundary,
      southwestBoundary: attributes.southwestBoundary,
      westBoundary: attributes.westBoundary,
      northwestBoundary: attributes.northwestBoundary,
      deletedAt: attributes.deletedAt,
      eventId,
      occurredOn,
    })
  }

  toPrimitives(): DeleteBlockDomainEventAttributes {
    const {
      block,
      area,
      street,
      availability,
      northBoundary,
      northeastBoundary,
      eastBoundary,
      southeastBoundary,
      southBoundary,
      southwestBoundary,
      westBoundary,
      northwestBoundary,
      deletedAt,
    } = this

    return {
      block,
      area,
      street,
      availability,
      northBoundary,
      northeastBoundary,
      eastBoundary,
      southeastBoundary,
      southBoundary,
      southwestBoundary,
      westBoundary,
      northwestBoundary,
      deletedAt,
    }
  }
}
