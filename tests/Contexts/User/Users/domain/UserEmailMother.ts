import {
  UserEmail,
} from '#@/src/Contexts/User/Users/domain/index.js'
import {
  MotherCreator,
} from '#@/tests/Contexts/Shared/domain/index.js'

export class UserEmailMother {
  static create(value?: string): UserEmail {
    return new UserEmail(value ?? MotherCreator.email())
  }
}
