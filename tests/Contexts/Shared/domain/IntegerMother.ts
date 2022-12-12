import { MotherCreator } from './MotherCreator'

export class IntegerMother {
  static random(max?: number): number {
    return MotherCreator.positiveNumber(max)
  }
}
