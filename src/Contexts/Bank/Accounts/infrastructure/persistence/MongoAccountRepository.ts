import { MongoRepository } from '@/Contexts/Shared/infrastructure'

import { Account, AccountRepository } from '../../domain'

interface AccountDocument {
  _id: string
  name: string
  balance: {
    amount: number
    currency: string
  }
}

export class MongoAccountRepository extends MongoRepository<Account> implements AccountRepository {
  async save(account: Account): Promise<void> {
    await this.persist(account.id, account)
  }

  async update(account: Account): Promise<void> {
    await this.persist(account.id, account)
  }

  async find(id: Account['id']): Promise<Nullable<Account>> {
    const collection = await this.collection<AccountDocument>()
    const result = await collection.findOne({ _id: id })
    if (!result) return null

    const { _id, ...document } = result
    const account = Account.fromPrimitives({
      ...document,
      id: _id.toString(),
    })
    return account
  }

  protected collectionName(): string {
    return 'accounts'
  }
}
