import {
  PositiveNumberValueObject,
} from '#@/src/Contexts/Shared/domain/index.js'

export class BlockArea extends PositiveNumberValueObject {
  constructor(value: number) {
    super(value)
  }
}
