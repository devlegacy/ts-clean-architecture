import {
  EntityRepository,
  EntitySchema,
  MikroORM,
} from '@mikro-orm/core'
import {
  MongoDriver,
} from '@mikro-orm/mongodb'
import {
  Service,
} from 'diod'
import {
  ObjectId,
  UUID,
} from 'mongodb'
import {
  validate,
  version,
} from 'uuid'

import {
  AggregateRoot,
  Criteria,
  OffsetPaginator,
  type Pagination,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  MongoCriteriaConverter,
} from '../mongo/MongoCriteriaConverter.js'

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

    const count = await collection.count(
      {
        ...(query.filter as any),
      },
      {
        // convertCustomTypes: false,
        // orderBy: query.sort as any
      },
    )
    return count
  }

  protected async offsetPagination(
    criteria: Criteria,
    offsetPagination: OffsetPaginator,
  ): Promise<{ data: T[], pagination?: Pagination }> {
    const collection = await this.repository()
    const query = this.#criteria.convert(criteria)

    const countDocuments = collection.count(
      {
        ...(query.filter as any),
      },
      {
        // convertCustomTypes: false,
        // orderBy: query.sort as any
      },
    )
    const documents = collection.find(
      {
        ...(query.filter as any),
      },
      {
        convertCustomTypes: false,
        orderBy: query.sort as any,
        limit: query.limit,
        offset: query.skip,
      },
    )

    const [
      total,
      data,
    ] = await Promise.all([
      countDocuments,
      documents,
    ])
    const pagination = offsetPagination.calculatePageNumbersBy(total).getPageNumbers()

    return {
      data,
      pagination,
    }
  }

  protected async client(): Promise<MikroORM<MongoDriver>> {
    return await this.#client
  }

  protected async repository(): Promise<EntityRepository<T>> {
    const client = await this.#client
    const repository = client.em.fork().getRepository(this.entitySchema())
    return repository
  }

  // eslint-disable-next-line complexity
  protected async _persist(aggregateRoot: T): Promise<void> {
    const repository = await this.repository()
    const {
      id,
    } = aggregateRoot as any

    if ((id?.value) && ObjectId.isValid((id?.value))) {
      (aggregateRoot as any).id = new ObjectId(id.value as string)
      // (aggregateRoot as any)._id = id
    }

    if ((id?.value) && validate((id?.value)) && version(id?.value) === 4) {
      (aggregateRoot as any).id = new UUID(id.value as string)
      // (aggregateRoot as any)._id = id
    }

    await repository.upsert(
      aggregateRoot,
    );

    (aggregateRoot as any).id = id
  }

  protected async persist(aggregateRoot: T): Promise<void> {
    // Nota: una forma de evitar las transacciones dentro de los repositorios es con publicación de eventos y retries
    // begin transaction
    // commit transaction
    // end transaction
    // rollback transaction if error and clean events
    const repository = await this.repository()
    // const client = this.#client
    // const manager = client.em
    try {
      const aggregateRootId = (aggregateRoot as any).id
      // @ts-expect-error add value on run time, esto debería funcionar automáticamente con los hooks tal vez, is not defined in Course but in Schema as ObjectId, add extends of ObjectId as Domain value object
      if ((!aggregateRoot.id || !(aggregateRoot.id instanceof ObjectId)) && (ObjectId.isValid((aggregateRoot.id?.value || aggregateRoot.id) as string))) {
        // @ts-expect-error add value on run time, esto debería funcionar automáticamente con los hooks tal vez
        aggregateRoot.id = new ObjectId((aggregateRoot.id.value || aggregateRoot.id) as string)
      }
      // // eslint-disable-next-line no-console
      // console.log(aggregateRoot)
      await repository.upsert(
        aggregateRoot,
        // {
        //   ...primitives,
        //   _id: primitives.id,
        // },
        {
          // convertCustomTypes: true,
          //   upsert: true,
        },
      )
      if (aggregateRootId) (aggregateRoot as any).id = aggregateRootId
      // await repository.getEntityManager().flush()

      // const _created = await repository
      //   .getEntityManager()
      //   .findOne<any>(
      //     this.entitySchema(),
      //     {
      //       _id: (aggregateRoot as any).id,
      //     } as any,
      //   )

      // // eslint-disable-next-line no-console
      // console.log(created)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }

  protected async matching(criteria: Criteria): Promise<T[]> {
    const query = this.#criteria.convert(criteria)

    const collection = await this.repository()

    const documents = await collection.find(
      {
        ...(query.filter as any),
      },
      {
        convertCustomTypes: false,
        orderBy: query.sort as any,
        limit: query.limit,
        offset: query.skip,
      },
    )

    return documents
  }

  protected abstract entitySchema(): EntitySchema<T>
}
