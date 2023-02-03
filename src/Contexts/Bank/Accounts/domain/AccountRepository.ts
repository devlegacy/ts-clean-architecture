import { Nullable } from '@/Contexts/Shared/domain'

import { Account } from './Account'

export interface AccountRepository {
  save(account: Account): Promise<void>
  update(id: Account['id'], account: Account): Promise<void>

  find(id: Account['id']): Promise<Nullable<Account>>
}
