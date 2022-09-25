import { MotherCreator } from './MotherCreator'

export class UuidMother {
  static random(): string {
    // return MotherCreator.random().datatype.uuid()
    return MotherCreator.random().database.mongodbObjectId()
  }
}
