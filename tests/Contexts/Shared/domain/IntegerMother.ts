import { MotherCreator } from './MotherCreator'

export class IntegerMother {
  static random(max?: number): number {
    const fixMax = MotherCreator.random().datatype.number({
      max: max && max > 20 ? 20 : max,
      min: 10
    })
    return MotherCreator.random().datatype.number({ max: fixMax })
  }
}
