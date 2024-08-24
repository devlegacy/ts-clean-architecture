import {
  AggregateRoot,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  LandDescriptionDescription,
  LandDescriptionFull,
  LandDescriptionId,
  LandDescriptionShort,
  LandDescriptionType,
} from './ValueObjects/index.js'

export type LandDescriptionEntityType = Entity<LandDescription>
export type LandDescriptionPrimitiveType = Primitives<LandDescription>

export class LandDescription extends AggregateRoot {
  readonly id: LandDescriptionId
  readonly description: LandDescriptionDescription
  readonly full: LandDescriptionFull
  readonly short: LandDescriptionShort
  readonly type: LandDescriptionType

  constructor(
    id: LandDescriptionId,
    description: LandDescriptionDescription,
    full: LandDescriptionFull,
    short: LandDescriptionShort,
    type: LandDescriptionType,
  ) {
    super()
    this.id = id
    this.description = description
    this.full = full
    this.short = short
    this.type = type
  }

  static create(data: LandDescriptionPrimitiveType) {
    const landDescription = new LandDescription(
      new LandDescriptionId(data.id),
      new LandDescriptionDescription(data.description),
      new LandDescriptionFull(data.full),
      new LandDescriptionShort(data.short),
      new LandDescriptionType(data.type),
    )
    // const event = new LandDescriptionCreatedDomainEvent({})

    return landDescription
  }

  // Communicate with infrastructure
  static override fromPrimitives(data: LandDescriptionPrimitiveType) {
    const landDescription = new LandDescription(
      new LandDescriptionId(data.id),
      new LandDescriptionDescription(data.description),
      new LandDescriptionFull(data.full),
      new LandDescriptionShort(data.short),
      new LandDescriptionType(data.type),
    )

    return landDescription
  }

  // Communicate with infrastructure
  toPrimitives() {
    return {
      id: this.id.value,
      description: this.description.value,
      full: this.full.value,
      short: this.short.value,
      type: this.type.value,
    }
  }
}
