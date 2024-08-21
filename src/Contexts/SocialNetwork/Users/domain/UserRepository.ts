import {
  Criteria,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  User,
} from './User.js'

export abstract class UserRepository {
  abstract save(user: User): Promise<void>

  abstract search(id: User['id']): Promise<Nullable<User>>

  abstract matching(criteria: Criteria): Promise<User[]>
}
