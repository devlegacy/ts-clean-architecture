import { inject } from 'tsyringe'
import { DataSource, EntitySchema, Repository } from 'typeorm'

import { TYPES } from '@/apps/mooc/dependency-injection'
import { AggregateRoot } from '@/Contexts/Shared/domain'

// Template method

export abstract class TypeOrmRepository<T extends AggregateRoot> {
  constructor(@inject(TYPES.DataSource) private _client: Promise<DataSource>) {}

  protected abstract entitySchema(): EntitySchema<T>

  protected client(): Promise<DataSource> {
    return this._client
  }

  protected async repository(): Promise<Repository<T>> {
    return (await this._client)?.getRepository(this.entitySchema())
  }

  protected async persist(aggregateRoot: T): Promise<void> {
    const repository = await this.repository()
    await repository.save(aggregateRoot)
  }
}
