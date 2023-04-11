import { inject } from 'tsyringe'
import { DataSource, EntitySchema, Repository } from 'typeorm'

import { AggregateRoot, SHARED_TYPES } from '@/Contexts/Shared/domain'

// Template method
export abstract class TypeOrmPostgresRepository<T extends AggregateRoot> {
  constructor(@inject(SHARED_TYPES.DataSource) private _client: Promise<DataSource>) {}

  protected client(): Promise<DataSource> {
    return this._client
  }

  protected async repository(): Promise<Repository<T>> {
    const client = await this._client
    return client?.getRepository(this.entitySchema())
  }

  protected async persist(aggregateRoot: T): Promise<void> {
    const repository = await this.repository()
    await repository.save(aggregateRoot)
  }

  protected abstract entitySchema(): EntitySchema<T>
}
