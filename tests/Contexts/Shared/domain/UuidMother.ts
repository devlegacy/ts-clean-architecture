import { MotherCreator } from './MotherCreator.js'

export class UuidMother {
  static random(): string {
    return MotherCreator.uuid()
  }
}
