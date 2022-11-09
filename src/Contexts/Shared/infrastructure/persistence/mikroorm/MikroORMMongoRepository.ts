import { EntityRepository, EntitySchema, MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { container } from 'tsyringe'

import { AggregateRoot, Criteria } from '@/Contexts/Shared/domain'

import { SHARED_TYPES } from '../../common'
import { MongoCriteriaConverter } from '../mongo/MongoCriteriaConverter'

export abstract class MikroOrmMongoRepository<T extends AggregateRoot> {
  private criteriaConverter: MongoCriteriaConverter
  // Diod
  // constructor(private readonly _client: Promise<MikroORM<MongoDriver>>) {}

  // tsyringe
  private readonly _client: Promise<MikroORM<MongoDriver>> = container.resolve(SHARED_TYPES.MongoClient)

  // private readonly _client: Promise<MikroORM<MongoDriver>>

  // constructor(@inject(SHARED_TYPES.MongoClient) client: Promise<MikroORM<MongoDriver>>) {
  constructor() {
    this.criteriaConverter = new MongoCriteriaConverter()
  }

  protected client(): Promise<MikroORM<MongoDriver>> {
    return this._client
  }

  protected async repository(): Promise<EntityRepository<T>> {
    return (await this._client)?.em.fork().getRepository(this.entitySchema())
  }

  protected async persist(aggregateRoot: T): Promise<void> {
    const repository = await this.repository()

    // const primitives = {
    //   _id: CourseId.random().toString(),
    //   ...aggregateRoot.toPrimitives()
    // }

    // delete primitives.id

    // repository.nativeInsert(aggregateRoot)
    repository.persist(aggregateRoot)

    await repository.flush()
  }

  protected async findByCriteria(criteria: Criteria): Promise<T[]> {
    const query = this.criteriaConverter.convert(criteria)

    const collection = await this.repository()

    const documents = await collection.find(
      { ...(query.filter as any) },
      {
        convertCustomTypes: false,
        orderBy: query.sort as any,
        limit: query.limit,
        offset: query.skip
      }
    )

    return documents
  }

  protected abstract entitySchema(): EntitySchema<T>
}
