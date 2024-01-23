import { EntitySchema, wrap } from '@mikro-orm/core'
import { Service } from 'diod'

import { Criteria, OffsetPaginator, type Pagination } from '@/Contexts/Shared/domain/index.js'
import { MikroOrmMongoRepository } from '@/Contexts/Shared/infrastructure/Persistence/index.js'

import { BackofficeCourse, BackofficeCourseRepository } from '../../domain/index.js'
import { BackofficeCourseEntity } from './mikroorm/mongo/BackofficeCourseEntity.js'

@Service()
export class MikroOrmMongoBackofficeCourseRepository
  extends MikroOrmMongoRepository<BackofficeCourse>
  implements BackofficeCourseRepository
{
  // constructor(
  //   @inject(SHARED_TYPES.MongoClient) client: Promise<MikroORM<MongoDriver>>,
  //   @inject(SHARED_TYPES.QueryBus) private readonly queryBus: QueryBus
  // ) {
  //   super(client)
  // }

  async count(criteria: Criteria) {
    return this.counter(criteria)
  }

  async paginate(
    criteria: Criteria,
    pagination: OffsetPaginator,
  ): Promise<{ data: BackofficeCourse[]; pagination?: Pagination }> {
    return this.offsetPagination(criteria, pagination)
  }

  async search(criteria: Criteria): Promise<BackofficeCourse[]> {
    const documents = await this.matching(criteria)

    return documents
  }

  save(course: BackofficeCourse): Promise<void> {
    return this.persist(course)
  }

  async update(course: BackofficeCourse): Promise<void> {
    const repository = await this.repository()

    const current = await repository.findOne(
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        _id: course.id,
      },
      { convertCustomTypes: true },
    )
    const { id, ...primitives } = course.toPrimitives()

    wrap(current).assign(
      {
        ...primitives,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        _id: id,
      },
      { convertCustomTypes: true },
    )
    if (!current) return

    await repository.persistAndFlush(current)
  }

  async delete(id: BackofficeCourse['id']): Promise<void> {
    const repository = await this.repository()
    repository.nativeUpdate(
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        _id: id,
      },
      { deletedAt: new Date() },
      { convertCustomTypes: true },
    )
  }

  async all(): Promise<BackofficeCourse[]> {
    // const courses = await this.queryBus.ask<CoursesResponse>(new SearchAllCoursesQuery())

    const repository = await this.repository()
    const courses = await repository.find({})

    return courses
  }

  protected entitySchema(): EntitySchema<BackofficeCourse> {
    return BackofficeCourseEntity
  }
}
