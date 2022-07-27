import { inject } from 'tsyringe'
import { DataSource, EntitySchema, Repository } from 'typeorm'

import { AggregateRoot } from '@/contexts/shared/domain/aggregate-root'

// Template method

export abstract class TypeOrmRepository<T extends AggregateRoot> {
  constructor(@inject('DataSource') private _client: Promise<DataSource>) {}

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
