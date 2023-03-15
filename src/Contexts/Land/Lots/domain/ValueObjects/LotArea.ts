import { PositiveNumberValueObject } from '@/Contexts/Shared/domain'

export class LotArea extends PositiveNumberValueObject {
  constructor(value: number) {
    super(value)
  }
}
