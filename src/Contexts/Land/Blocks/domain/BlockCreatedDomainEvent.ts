import { DomainEvent } from '@/Contexts/Shared/domain'

type CreateBlockDomainEventAttributes = {
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
}

export class BlockCreatedDomainEvent extends DomainEvent {
  static override readonly EVENT_NAME = 'block.created'

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
  }: {
    aggregateId: string
    eventId?: string
    occurredOn?: Date
    block: string
    area: number
    street: string
    availability: string
    northBoundary: string
    northeastBoundary: string
    eastBoundary: string
    southeastBoundary: string
    southBoundary: string
    southwestBoundary: string
    westBoundary: string
    northwestBoundary: string
  }) {
    super({
      aggregateId,
      eventName: BlockCreatedDomainEvent.EVENT_NAME,
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
  }

  static override fromPrimitives(params: {
    aggregateId: string
    attributes: CreateBlockDomainEventAttributes
    eventId: string
    occurredOn: Date
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params
    return new BlockCreatedDomainEvent({
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
      eventId,
      occurredOn,
    })
  }

  toPrimitives(): CreateBlockDomainEventAttributes {
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
    }
  }
}
