import { MotherCreator } from './MotherCreator'

export class IdMother {
  static random(): string {
    return MotherCreator.objectId()
  }
}
