import { AggregateRoot, isNil } from '@/Contexts/Shared/domain'

import { LandDescription } from '../../LandDescriptions/domain'
import { BlockId, Boundary } from '../../Shared/domain'
import { BlockCreatedDomainEvent } from './BlockCreatedDomainEvent'
import { BlockDeletedDomainEvent } from './BlockDeletedDomainEvent'
import {
  BlockArea,
  BlockAvailability,
  BlockBlock,
  BlockCreatedAt,
  BlockDeletedAt,
  BlockStreet,
  BlockUpdatedAt,
} from './ValueObjects'

export type BlockEntityType = Entity<
  Omit<SetOptional<Block, 'createdAt' | 'updatedAt'>, 'fullDescription' | 'shortDescription'>
>

export type BlockPrimitiveType = Primitives<SetOptional<Block, 'createdAt' | 'updatedAt'>>

export class Block extends AggregateRoot {
  readonly id: BlockId

  // Mz. 82B // prefix number suffix

  // block_metadata = {short: 'Mz.', long: 'Manzana', description: 'Describe una manzana o bloque'}
  // readonly prefix!: string // Manzana
  // readonly prefix_abbreviation!: string // Mz. Fr.

  // readonly number!: number // 80
  // readonly suffix!: string // B
  readonly block: BlockBlock // Mz. 80B | Manzana 80B | 8B
  // full_description: Manzana 80B
  // short_description: Mz. 80B
  // description: 8B

  readonly area: BlockArea
  readonly street: BlockStreet
  readonly availability: BlockAvailability

  readonly northBoundary: Boundary
  readonly northeastBoundary: Boundary
  readonly eastBoundary: Boundary
  readonly southeastBoundary: Boundary
  readonly southBoundary: Boundary
  readonly southwestBoundary: Boundary
  readonly westBoundary: Boundary
  readonly northwestBoundary: Boundary

  readonly createdAt: BlockCreatedAt
  readonly updatedAt: BlockUpdatedAt

  private deletedAt?: BlockDeletedAt
  private description?: LandDescription

  get fullDescription() {
    const fullDescription = this.description?.full?.toString() ?? ''
    const block = this.block.toString()

    return `${fullDescription} ${block}`
  }

  get shortDescription() {
    const shortDescription = this.description?.short?.toString() ?? ''
    const block = this.block.toString()

    return `${shortDescription} ${block}`
  }

  constructor(
    id: BlockId,
    block: BlockBlock,
    area: BlockArea,
    street: BlockStreet,
    availability: BlockAvailability,
    northBoundary: Boundary,
    northeastBoundary: Boundary,
    eastBoundary: Boundary,
    southeastBoundary: Boundary,
    southBoundary: Boundary,
    southwestBoundary: Boundary,
    westBoundary: Boundary,
    northwestBoundary: Boundary,
    createdAt?: BlockCreatedAt,
    updatedAt?: BlockUpdatedAt
  ) {
    super()
    this.id = id
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

    this.createdAt = createdAt ?? BlockCreatedAt.now()
    this.updatedAt = updatedAt ?? BlockUpdatedAt.now()

    this.deletedAt = undefined
  }

  static create(data: BlockEntityType) {
    const block = new Block(
      data.id,
      data.block,
      data.area,
      data.street,
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
    const event = new BlockCreatedDomainEvent({
      aggregateId: data.id.value,
      block: data.block.value,
      area: data.area.value,
      street: data.street.value,
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
    block.record(event)

    return block
  }

  /**
   * Communicate with infrastructure
   * @returns
   */
  static override fromPrimitives(data: ReturnType<typeof Block.prototype.toPrimitives>) {
    //BlockPrimitiveDto
    const block = new Block(
      new BlockId(data.id),
      new BlockBlock(data.block),
      new BlockArea(data.area),
      new BlockStreet(data.street),
      new BlockAvailability(data.availability),
      new Boundary(data.northBoundary),
      new Boundary(data.northeastBoundary),
      new Boundary(data.eastBoundary),
      new Boundary(data.southeastBoundary),
      new Boundary(data.southBoundary),
      new Boundary(data.southwestBoundary),
      new Boundary(data.westBoundary),
      new Boundary(data.northwestBoundary),
      !isNil(data.createdAt) ? new BlockCreatedAt(data.createdAt) : undefined,
      !isNil(data.updatedAt) ? new BlockUpdatedAt(data.updatedAt) : undefined
    )

    return block
  }

  /**
   * Set up description
   */
  setDescription(description: LandDescription) {
    this.description = description
  }

  remove() {
    this.deletedAt = BlockDeletedAt.now()

    const event = new BlockDeletedDomainEvent({
      aggregateId: this.id.value,
      block: this.block.value,
      area: this.area.value,
      street: this.street.value,
      availability: this.availability.value,
      northBoundary: this.northBoundary.value,
      northeastBoundary: this.northeastBoundary.value,
      eastBoundary: this.eastBoundary.value,
      southeastBoundary: this.southeastBoundary.value,
      southBoundary: this.southBoundary.value,
      southwestBoundary: this.southwestBoundary.value,
      westBoundary: this.westBoundary.value,
      northwestBoundary: this.northwestBoundary.value,
      // deletedAt: this.deletedAt?.value,
    })
    this.record(event)
  }

  /**
   * Communicate with infrastructure
   * @returns
   */
  toPrimitives() {
    return {
      id: this.id.value,
      block: this.block.value,
      area: this.area.value,
      street: this.street.value,
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
      deletedAt: this.deletedAt?.value,
    }
  }
}
