import { MotherCreator } from './MotherCreator.js'

export class ObjectIdMother {
  static random(): string {
    return MotherCreator.objectId()
  }
}
