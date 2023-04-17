import { EntityRepository, EntitySchema, MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { Service } from 'diod'

import { AggregateRoot, Criteria, OffsetPagination, Pagination } from '@/Contexts/Shared/domain'

import { MongoCriteriaConverter } from '../mongo/MongoCriteriaConverter'

@Service()
export abstract class MikroOrmMongoRepository<T extends AggregateRoot> {
  #client: Promise<MikroORM<MongoDriver>>
  // private readonly criteriaConverter: MongoCriteriaConverter
  #criteria = new MongoCriteriaConverter()
  // Diod
  constructor(client: MikroORM<MongoDriver>) {
    // this.criteriaConverter = new MongoCriteriaConverter()
    this.#client = client as unknown as Promise<MikroORM<MongoDriver>>
  }

  // tsyringe
  // private readonly _client: Promise<MikroORM<MongoDriver>> = container.resolve(SHARED_TYPES.MongoClient)

  // private readonly _client: Promise<MikroORM<MongoDriver>>

  // constructor(@inject(SHARED_TYPES.MongoClient) client: Promise<MikroORM<MongoDriver>>) {
  // constructor() {
  //   this.criteriaConverter = new MongoCriteriaConverter()
  // }

  protected async countDocuments(criteria: Criteria) {
    const collection = await this.repository()
    const query = this.#criteria.convert(criteria)

    const count = collection.count(
      { ...(query.filter as any) },
      {
        // convertCustomTypes: false,
        // orderBy: query.sort as any
      }
    )
    return count
  }

  protected async offsetPagination(
    criteria: Criteria,
    offsetPagination: OffsetPagination
  ): Promise<{ data: T[]; pagination?: Pagination }> {
    const collection = await this.repository()
    const query = this.#criteria.convert(criteria)

    const countDocuments = collection.count(
      { ...(query.filter as any) },
      {
        // convertCustomTypes: false,
        // orderBy: query.sort as any
      }
    )
    const documents = await collection.find(
      { ...(query.filter as any) },
      {
        convertCustomTypes: false,
        orderBy: query.sort as any,
        limit: query.limit,
        offset: query.skip,
      }
    )

    const [total, data] = await Promise.all([countDocuments, documents])
    const pagination = offsetPagination.calculatePageNumbersBy(total).getPageNumbers()

    return {
      data,
      pagination,
    }
  }

  protected client(): Promise<MikroORM<MongoDriver>> {
    return this.#client
  }

  protected async repository(): Promise<EntityRepository<T>> {
    const client = await this.#client
    const repository = client.em.fork().getRepository(this.entitySchema())
    return repository
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

  protected async matching(criteria: Criteria): Promise<T[]> {
    const query = this.#criteria.convert(criteria)

    const collection = await this.repository()

    const documents = await collection.find(
      { ...(query.filter as any) },
      {
        convertCustomTypes: false,
        orderBy: query.sort as any,
        limit: query.limit,
        offset: query.skip,
      }
    )

    return documents
  }

  protected abstract entitySchema(): EntitySchema<T>
}
