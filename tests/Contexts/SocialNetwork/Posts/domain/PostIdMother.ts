import {
  PostId,
} from '#@/src/Contexts/SocialNetwork/Shared/domain/index.js'
import {
  UuidMother,
} from '#@/tests/Contexts/Shared/domain/index.js'

export class PostIdMother {
  static create(value?: string): PostId {
    return new PostId(value ?? UuidMother.random())
  }
}
