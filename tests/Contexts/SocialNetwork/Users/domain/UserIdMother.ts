import {
  UserId,
} from '#@/src/Contexts/SocialNetwork/Shared/domain/index.js'
import {
  UuidMother,
} from '#@/tests/Contexts/Shared/domain/index.js'

export class UserIdMother {
  static create(value?: string): UserId {
    return new UserId(value ?? UuidMother.random())
  }
}
