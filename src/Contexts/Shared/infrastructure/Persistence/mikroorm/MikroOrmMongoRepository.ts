import { EntityRepository, EntitySchema, MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { Service } from 'diod'
import { ObjectId } from 'mongodb'

import { AggregateRoot, Criteria, OffsetPaginator, type Pagination } from '@/Contexts/Shared/domain/index.js'

import { MongoCriteriaConverter } from '../mongo/MongoCriteriaConverter.js'

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

  protected async counter(criteria: Criteria) {
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
    offsetPagination: OffsetPaginator
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
    // Nota: una forma de evitar las transacciones dentro de los repositorios es con publicación de eventos y retries
    // begin transaction
    // commit transaction
    // end transaction
    // rollback transaction if error and clean events
    // const repository = await this.repository()
    const client = await this.#client
    const manager = client.em

    // const primitives = {
    //   _id: CourseId.random().toString(),
    //   ...aggregateRoot.toPrimitives()
    // }

    // delete primitives.id

    // repository.nativeInsert(aggregateRoot)
    // const primitives = aggregateRoot.toPrimitives()

    try {
      // @ts-expect-error add value on run time, esto debería funcionar automáticamente con los hooks tal vez
      if (!aggregateRoot._id || !(aggregateRoot._id instanceof ObjectId)) {
        // @ts-expect-error add value on run time, esto debería funcionar automáticamente con los hooks tal vez
        aggregateRoot._id = new ObjectId(aggregateRoot.id.value)
      }
      // new CoursesCounterId(aggregateRoot.id.value)
      // new ObjectId(aggregateRoot.id.value)
      // { ...aggregateRoot.id }
      await manager.upsert(
        this.entitySchema(),
        aggregateRoot,
        // {
        //   ...primitives,
        //   _id: primitives.id,
        // },
        {
          // convertCustomTypes: true,
          //   upsert: true,
        }
      )
      // await manager.persistAndFlush(aggregateRoot)
      console.log(aggregateRoot)
    } catch (e) {
      console.log(e)
    }
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
