import { PositiveNumberValueObject } from '@/Contexts/Shared/domain/index.js'

export class LotArea extends PositiveNumberValueObject {
  constructor(value: number) {
    super(value)
  }
}
