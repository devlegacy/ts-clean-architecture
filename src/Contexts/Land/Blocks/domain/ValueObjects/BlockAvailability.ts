import { EnumValueObject, InvalidArgumentError } from '@/Contexts/Shared/domain'

export enum Availability {
  AVAILABLE = 'available',
  NOT_AVAILABLE = 'not_available',
  SOLD = 'sold',
}

export type AvailabilityKeys =
  | `${(typeof Availability)[keyof typeof Availability]}`
  | keyof typeof Availability
  | (string & NonNullable<unknown>)
// export type AvailabilityKeys2 = FlatEnum<typeof Availability>

export class BlockAvailability extends EnumValueObject<Availability> {
  constructor(value: Availability) {
    super(value, Object.values(Availability))
  }

  static fromValue(value: AvailabilityKeys | Availability): BlockAvailability {
    const key = (value in Availability ? value : value.toUpperCase()) as Availability
    console.log(value, key)
    return new BlockAvailability(key)
  }

  static available() {
    const availability = new BlockAvailability(Availability.AVAILABLE)
    return availability
  }

  protected throwInvalidValueError(value: Availability): void {
    throw new InvalidArgumentError(`The availability value <${value}> is invalid`)
  }
}
