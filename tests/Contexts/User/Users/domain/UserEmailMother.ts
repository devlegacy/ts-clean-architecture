import { UserEmail } from '@/Contexts/User/Users/domain'
import { MotherCreator } from '@/tests/Contexts/Shared/domain'

export class UserEmailMother {
  static create(value?: string): UserEmail {
    return new UserEmail(value ?? MotherCreator.email())
  }
}
