import { PositiveNumberValueObject } from '@/Contexts/Shared/domain'

export class BlockArea extends PositiveNumberValueObject {
  constructor(value: number) {
    super(value)
  }
}
