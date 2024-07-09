import {
  MotherCreator,
} from './MotherCreator.js'

export class IntegerMother {
  static random(max?: number): number {
    return MotherCreator.positiveNumber(max)
  }
}
