import { UserId } from '@/Contexts/User/Shared/domain/index.js'
import { ObjectIdMother } from '@/tests/Contexts/Shared/domain/index.js'

export class UserIdMother {
  static create(value?: string): UserId {
    return new UserId(value ?? ObjectIdMother.random())
  }
}
