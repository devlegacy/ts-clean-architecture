import { MotherCreator } from './MotherCreator'

export class ObjectIdMother {
  static random(): string {
    return MotherCreator.objectId()
  }
}
