import { UserBirthdate } from '@/Contexts/User/Users/domain'
import { MotherCreator } from '@/tests/Contexts/Shared/domain'

export class UserBirthdateMother {
  static create(value?: Date): UserBirthdate {
    return new UserBirthdate(value ?? MotherCreator.birthdate())
  }
}
