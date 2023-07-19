import { UserId } from '@/Contexts/User/Shared/domain'
import { ObjectIdMother } from '@/tests/Contexts/Shared/domain'

export class UserIdMother {
  static create(value?: string): UserId {
    return new UserId(value ?? ObjectIdMother.random())
  }
}
