import { MotherCreator } from './MotherCreator'

export class IntegerMother {
  static random(max?: number): number {
    return MotherCreator.random().datatype.number({
      min: 1,
      max
    })
  }
}
