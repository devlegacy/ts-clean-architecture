import { EnumValueObject, InvalidArgumentError } from '@/Contexts/Shared/domain/index.js'

export enum Availability {
  available = 'available',
  not_available = 'not_available',
  sold = 'sold',
}

export type AvailabilityKeys = keyof typeof Availability

export class LotAvailability extends EnumValueObject<Availability> {
  constructor(value: Availability) {
    super(value, Object.values(Availability))
  }

  static fromValue(value: AvailabilityKeys | Availability): LotAvailability {
    const key = (typeof value === 'string' ? Availability[`${value}`] : value) as AvailabilityKeys
    return new LotAvailability(Availability[`${key}`])
  }

  static available() {
    const availability = new LotAvailability(Availability.available)
    return availability
  }

  protected throwInvalidValueError(value: Availability): void {
    throw new InvalidArgumentError(`The availability type <${value}> is invalid`)
  }
}
