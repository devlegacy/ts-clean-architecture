import { EnumValueObject, InvalidArgumentError } from '@/Contexts/Shared/domain'

export enum Availability {
  available = 'available',
  not_available = 'not_available',
  sold = 'sold',
}

export type AvailabilityKeys = keyof typeof Availability

export class BlockAvailability extends EnumValueObject<Availability> {
  constructor(value: Availability) {
    super(value, Object.values(Availability))
  }

  static fromValue(value: AvailabilityKeys | Availability): BlockAvailability {
    const key = (typeof value === 'string' ? Availability[`${value}`] : value) as AvailabilityKeys
    return new BlockAvailability(Availability[`${key}`])
  }

  static available() {
    const availability = new BlockAvailability(Availability.available)
    return availability
  }

  protected throwInvalidValueError(value: Availability): void {
    throw new InvalidArgumentError(`The availability type <${value}> is invalid`)
  }
}
