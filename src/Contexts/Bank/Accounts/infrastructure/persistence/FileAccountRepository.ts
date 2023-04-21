import { deserialize, serialize } from 'bson'
import { existsSync, mkdirSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'

import { Account, AccountRepository } from '../../domain'

export class FileAccountRepository implements AccountRepository {
  private FILE_PATH = `${__dirname}/Accounts`

  constructor() {
    this.ensureDirectoryExistence()
  }

  async save(account: Account): Promise<void> {
    await writeFile(this.path(account.id), serialize(account.toPrimitives()))
  }

  async update(account: Account): Promise<void> {
    await this.save(account)
  }

  async find(accountId: string): Promise<Nullable<Account>> {
    const accountData = await readFile(this.path(accountId))
    const { id, name, balance } = deserialize(accountData)

    return Account.fromPrimitives({
      id,
      name,
      balance,
    })
  }

  private ensureDirectoryExistence() {
    const path = this.FILE_PATH
    if (existsSync(path)) {
      return true
    }
    mkdirSync(path, { recursive: true })
  }

  private path(id: string) {
    return `${this.FILE_PATH}.${id}.repo`
  }
}
