// import { Collection, MongoClient, ObjectId } from 'mongodb'
// import { inject } from 'tsyringe'

// import { TYPES } from '@/apps/mooc/backend/dependency-injection/types'
// import { AggregateRoot } from '@/Contexts/Shared/domain'

// type EntityId = string | ObjectId

// export abstract class MongoRepository<T extends AggregateRoot> {
//   constructor(@inject(TYPES.MongoClient) private readonly _client: Promise<MongoClient>) {}

//   protected abstract collectionName(): string

//   protected client(): Promise<MongoClient> {
//     return this._client
//   }

//   protected async collection(): Promise<Collection> {
//     return (await this._client).db().collection(this.collectionName())
//   }

//   protected async persist(id: EntityId, aggregateRoot: T, transform?: (obj: any) => any): Promise<void> {
//     const collection = await this.collection()
//     const _id = ObjectId.isValid(id) ? new ObjectId(id) : id
//     const primitives = transform ? transform(aggregateRoot.toPrimitives()) : aggregateRoot.toPrimitives()
//     const document = {
//       ...primitives,
//       _id,
//       id: undefined
//     }

//     /**
//      * NOTE: Mongo interpreta undefined como null
//      * al menos que se configure en la configuración para descartar al insertar
//      */
//     await collection.updateOne(
//       { _id },
//       {
//         $setOnInsert: {
//           createdAt: new Date(),
//           updatedAt: new Date()
//         },
//         $set: document
//       },
//       { upsert: true }
//     )
//   }
// }

import { EntityRepository, EntitySchema, MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { container } from 'tsyringe'

import { AggregateRoot, Criteria } from '@/Contexts/Shared/domain'

import { SHARED_TYPES } from '../../common'
import { MongoCriteriaConverter } from './MongoCriteriaConverter'

export abstract class MongoRepository<T extends AggregateRoot> {
  private criteriaConverter: MongoCriteriaConverter
  // Diod
  // constructor(private readonly _client: Promise<MikroORM<MongoDriver>>) {}

  // tsyringe
  private readonly _client: Promise<MikroORM<MongoDriver>> = container.resolve(SHARED_TYPES.MongoClient)

  // constructor(@inject(SHARED_TYPES.MongoClient) client: Promise<MikroORM<MongoDriver>>) {
  // if (!client) {
  // this._client = client
  // }
  // }

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
