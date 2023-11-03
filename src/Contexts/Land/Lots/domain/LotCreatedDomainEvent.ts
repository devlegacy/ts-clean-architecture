import {
  DomainEvent,
  type DomainEventPrimitives,
  type DomainEventPrimitivesWithAttributes,
} from '@/Contexts/Shared/domain/index.js'

interface CreateLotDomainEventAttributes {
  blockId: string
  lot: string
  area: number
  availability: string
  northBoundary: string
  northeastBoundary: string
  eastBoundary: string
  southeastBoundary: string
  southBoundary: string
  southwestBoundary: string
  westBoundary: string
  northwestBoundary: string
}

export class LotCreatedDomainEvent extends DomainEvent implements CreateLotDomainEventAttributes {
  static override EVENT_NAME = 'lot.created'

  readonly blockId: string
  readonly lot: string
  readonly area: number
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
    blockId,
    lot,
    area,
    availability,
    northBoundary,
    northeastBoundary,
    eastBoundary,
    southeastBoundary,
    southBoundary,
    southwestBoundary,
    westBoundary,
    northwestBoundary,
    ...event
  }: DomainEventPrimitives<CreateLotDomainEventAttributes>) {
    const eventName = LotCreatedDomainEvent.EVENT_NAME
    super({
      eventName,
      ...event,
    })
    this.blockId = blockId
    this.lot = lot
    this.area = area
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

  static override fromPrimitives(
    props: DomainEventPrimitivesWithAttributes<LotCreatedDomainEvent>
  ): LotCreatedDomainEvent {
    const {
      eventId,
      occurredOn,
      aggregateId,
      attributes: {
        blockId,
        lot,
        area,
        availability,
        northBoundary,
        northeastBoundary,
        eastBoundary,
        southeastBoundary,
        southBoundary,
        southwestBoundary,
        westBoundary,
        northwestBoundary,
      },
    } = props

    const event = new LotCreatedDomainEvent({
      eventId,
      occurredOn,
      aggregateId,
      blockId,
      lot,
      area,
      availability,
      northBoundary,
      northeastBoundary,
      eastBoundary,
      southeastBoundary,
      southBoundary,
      southwestBoundary,
      westBoundary,
      northwestBoundary,
    })
    return event
  }

  toPrimitives() {
    const {
      blockId,
      lot,
      area,
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
      blockId,
      lot,
      area,
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
