import { EntityRepository, EntitySchema, MikroORM } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { container } from 'tsyringe'

import { AggregateRoot } from '@/Contexts/Shared/domain'

import { SHARED_TYPES } from '../../common'

export abstract class MikroOrmPostgresRepository<T extends AggregateRoot> {
  private readonly _client: Promise<MikroORM<PostgreSqlDriver>> = container.resolve(SHARED_TYPES.MongoClient)

  protected client(): Promise<MikroORM<PostgreSqlDriver>> {
    return this._client
  }

  protected async repository(): Promise<EntityRepository<T>> {
    const client = await this._client
    return client?.em.fork().getRepository(this.entitySchema())
  }

  protected async persist(aggregateRoot: T): Promise<void> {
    const repository = await this.repository()
    repository.persist(aggregateRoot)
    await repository.flush()
  }

  protected abstract entitySchema(): EntitySchema<T>
}
