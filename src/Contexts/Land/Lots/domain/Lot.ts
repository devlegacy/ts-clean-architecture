import { AggregateRoot, Entity, Primitives, SetOptional } from '@/Contexts/Shared/domain'

import { BlockDeletedAt } from '../../Blocks/domain'
import { LandDescription } from '../../LandDescriptions/domain'
import { BlockId, Boundary } from '../../Shared/domain'
import { LotCreatedDomainEvent } from './LotCreatedDomainEvent'
import { LotArea, LotAvailability, LotCreatedAt, LotDeletedAt, LotId, LotLot, LotUpdatedAt } from './ValueObjects'

export type LotEntityDto = Entity<
  Omit<SetOptional<Lot, 'createdAt' | 'updatedAt'>, 'fullDescription' | 'shortDescription'>
>
export type LotPrimitiveDto = Primitives<SetOptional<Lot, 'createdAt' | 'updatedAt'>>

export class Lot extends AggregateRoot {
  readonly id: LotId
  readonly blockId: BlockId

  readonly lot: LotLot
  readonly area: LotArea

  readonly availability: LotAvailability

  readonly northBoundary: Boundary
  readonly northeastBoundary: Boundary
  readonly eastBoundary: Boundary
  readonly southeastBoundary: Boundary
  readonly southBoundary: Boundary
  readonly southwestBoundary: Boundary
  readonly westBoundary: Boundary
  readonly northwestBoundary: Boundary

  readonly createdAt: LotCreatedAt
  readonly updatedAt: LotUpdatedAt

  private deletedAt?: LotDeletedAt
  private description?: LandDescription

  get fullDescription() {
    const fullDescription = this.description?.full?.toString()
    const lot = this.lot.toString()

    return `${fullDescription} ${lot}`
  }

  get shortDescription() {
    const shortDescription = this.description?.short?.toString()
    const lot = this.lot.toString()

    return `${shortDescription} ${lot}`
  }

  constructor(
    id: LotId,
    blockId: BlockId,
    lot: LotLot,
    area: LotArea,
    availability: LotAvailability,
    northBoundary: Boundary,
    northeastBoundary: Boundary,
    eastBoundary: Boundary,
    southeastBoundary: Boundary,
    southBoundary: Boundary,
    southwestBoundary: Boundary,
    westBoundary: Boundary,
    northwestBoundary: Boundary,
    createdAt?: LotCreatedAt,
    updatedAt?: LotUpdatedAt
  ) {
    super()
    this.id = id
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

    this.createdAt = createdAt ?? LotCreatedAt.now()
    this.updatedAt = updatedAt ?? LotUpdatedAt.now()

    this.deletedAt = undefined
  }

  static create(data: LotEntityDto) {
    const lot = new Lot(
      data.id,
      data.blockId,
      data.lot,
      data.area,
      data.availability,
      data.northBoundary,
      data.northeastBoundary,
      data.eastBoundary,
      data.southeastBoundary,
      data.southBoundary,
      data.southwestBoundary,
      data.westBoundary,
      data.northwestBoundary
    )
    const event = new LotCreatedDomainEvent({
      aggregateId: data.id.value,
      blockId: data.blockId.value,
      lot: data.lot.value,
      area: data.area.value,
      availability: data.availability.value,
      northBoundary: data.northBoundary.value,
      northeastBoundary: data.northeastBoundary.value,
      eastBoundary: data.eastBoundary.value,
      southeastBoundary: data.southeastBoundary.value,
      southBoundary: data.southBoundary.value,
      southwestBoundary: data.southwestBoundary.value,
      westBoundary: data.westBoundary.value,
      northwestBoundary: data.northwestBoundary.value,
    })
    lot.record(event)

    return lot
  }

  static override fromPrimitives(data: ReturnType<typeof Lot.prototype.toPrimitives>) {
    const lot = new Lot(
      new LotId(data.id),
      new BlockId(data.blockId),
      new LotLot(data.lot),
      new LotArea(data.area),
      new LotAvailability(data.availability),
      new Boundary(data.northBoundary),
      new Boundary(data.northeastBoundary),
      new Boundary(data.eastBoundary),
      new Boundary(data.southeastBoundary),
      new Boundary(data.southBoundary),
      new Boundary(data.southwestBoundary),
      new Boundary(data.westBoundary),
      new Boundary(data.northwestBoundary),
      data.createdAt ? new LotCreatedAt(data.createdAt) : undefined,
      data.updatedAt ? new LotUpdatedAt(data.updatedAt) : undefined
    )

    return lot
  }

  setDescription(description: LandDescription) {
    this.description = description
  }

  remove() {
    this.deletedAt = BlockDeletedAt.now()
  }

  toPrimitives() {
    return {
      id: this.id.value,
      blockId: this.blockId.value,
      lot: this.lot.value,
      area: this.area.value,
      availability: this.availability.value,
      northBoundary: this.northBoundary.value,
      northeastBoundary: this.northeastBoundary.value,
      eastBoundary: this.eastBoundary.value,
      southeastBoundary: this.southeastBoundary.value,
      southBoundary: this.southBoundary.value,
      southwestBoundary: this.southwestBoundary.value,
      westBoundary: this.westBoundary.value,
      northwestBoundary: this.northwestBoundary.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    }
  }
}
