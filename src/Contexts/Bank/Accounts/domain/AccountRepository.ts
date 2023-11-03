import { Account } from './Account.js'

export interface AccountRepository {
  save(account: Account): Promise<void>
  update(account: Account): Promise<void>

  find(id: Account['id']): Promise<Nullable<Account>>
}
