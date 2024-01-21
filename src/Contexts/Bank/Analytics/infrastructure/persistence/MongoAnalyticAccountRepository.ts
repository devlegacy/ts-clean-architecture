import { MongoRepository } from '@/Contexts/Shared/infrastructure/index.js'

import { AnalyticAccount, type AnalyticAccountRepository } from '../../domain/index.js'

interface AnalyticAccountDocument {
  _id: string
  currency: string
  connections: {
    startedAt: number
  }[]
}

export class MongoAnalyticAccountRepository
  extends MongoRepository<AnalyticAccount>
  implements AnalyticAccountRepository
{
  async find(id: AnalyticAccount['id']): Promise<Nullable<AnalyticAccount>> {
    const collection = await this.collection<AnalyticAccountDocument>()
    const document = await collection.findOne({ _id: id })
    if (!document) return null

    const { _id, ...data } = document
    const account = AnalyticAccount.fromPrimitives({
      ...data,
      id: _id.toString(),
    })
    return account
  }

  async findAccountsPerCurrency(currency: AnalyticAccount['currency']): Promise<AnalyticAccount[]> {
    const collection = await this.collection<AnalyticAccountDocument>()
    const documents = await collection.find({ currency }).toArray()
    const accounts = documents.map(({ _id, ...document }) =>
      AnalyticAccount.fromPrimitives({
        ...document,
        id: _id.toString(),
      }),
    )

    return accounts
  }

  async trackNewAccount(account: AnalyticAccount): Promise<void> {
    await super.persist(account.id, account)
  }

  async save(account: AnalyticAccount): Promise<void> {
    await super.persist(account.id, account)
  }

  async update(account: AnalyticAccount): Promise<void> {
    await super.persist(account.id, account)
  }

  protected collectionName(): string {
    return 'analytic_accounts'
  }
}
