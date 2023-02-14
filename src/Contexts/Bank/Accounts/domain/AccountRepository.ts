import { Nullable } from '@/Contexts/Shared/domain'

import { Account } from './Account'

export interface AccountRepository {
  save(account: Account): Promise<void>
  update(account: Account): Promise<void>

  find(id: Account['id']): Promise<Nullable<Account>>
}
