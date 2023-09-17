import { UserBirthdate } from '@/Contexts/User/Users/domain/index.js'
import { MotherCreator } from '@/tests/Contexts/Shared/domain/index.js'

export class UserBirthdateMother {
  static create(value?: Date): UserBirthdate {
    return new UserBirthdate(value ?? MotherCreator.birthdate())
  }
}
