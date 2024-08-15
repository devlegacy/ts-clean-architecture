import {
  EntityRepository,
  EntitySchema,
  MikroORM,
} from '@mikro-orm/core'
import {
  PostgreSqlDriver,
} from '@mikro-orm/postgresql'
import {
  Service,
} from 'diod'

import {
  AggregateRoot,
} from '#@/src/Contexts/Shared/domain/index.js'

@Service()
export abstract class MikroOrmPostgresRepository<T extends AggregateRoot> {
  #client: Promise<MikroORM<PostgreSqlDriver>>

  constructor(client: MikroORM<PostgreSqlDriver>) {
    this.#client = client as unknown as Promise<MikroORM<PostgreSqlDriver>>
  }

  protected client(): Promise<MikroORM<PostgreSqlDriver>> {
    return this.#client
  }

  protected async repository(): Promise<EntityRepository<T>> {
    const client = await this.#client
    const repository = client?.em.fork().getRepository(this.entitySchema())
    return repository
  }

  protected async persist(aggregateRoot: T): Promise<void> {
    const repository = await this.repository()
    // @ts-expect-error MikroORM types are not correct
    repository.persist(aggregateRoot)
    // @ts-expect-error MikroORM types are not correct
    await repository.flush()
  }

  protected abstract entitySchema(): EntitySchema<T>
}
