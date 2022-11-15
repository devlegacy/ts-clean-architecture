import { AggregateRoot, NonFunctionProperties, Primitives } from '@/Contexts/Shared/domain'

import { BackofficeCourseDuration, BackofficeCourseId, BackofficeCourseName } from './value-object'

export type BackofficeCourseEntityDto = NonFunctionProperties<BackofficeCourse>
export type BackofficeCoursePrimitiveDto = Primitives<BackofficeCourse>

export class BackofficeCourse extends AggregateRoot {
  readonly id: BackofficeCourseId
  readonly name: BackofficeCourseName
  readonly duration?: BackofficeCourseDuration
  // Timestamps
  readonly createdAt?: Date
  readonly updatedAt?: Date
  readonly deletedAt?: Date

  constructor(
    id: BackofficeCourseId,
    name: BackofficeCourseName,
    duration?: BackofficeCourseDuration,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
  ) {
    super()
    this.id = id
    this.name = name
    this.duration = duration
    this.createdAt = createdAt ?? new Date()
    this.updatedAt = updatedAt ?? new Date()
    this.deletedAt = deletedAt
  }

  static create(
    id: BackofficeCourseId,
    name: BackofficeCourseName,
    duration: BackofficeCourseDuration,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
  ): BackofficeCourse {
    const course = new BackofficeCourse(id, name, duration, createdAt, updatedAt, deletedAt)

    return course
  }

  static fromPrimitives(data: BackofficeCoursePrimitiveDto): BackofficeCourse {
    return new BackofficeCourse(
      new BackofficeCourseId(data.id),
      new BackofficeCourseName(data.name),
      data.duration ? new BackofficeCourseDuration(data.duration) : undefined,
      data.createdAt ? data.createdAt : undefined,
      data.updatedAt ? data.updatedAt : undefined,
      data.deletedAt ? data.deletedAt : undefined
    )
  }

  toPrimitives(): BackofficeCoursePrimitiveDto {
    return {
      // HACK: On retrieve data by MiKroOrm // DEBT
      id: this.id.value.toString(),
      name: this.name.value,
      duration: this.duration?.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    }
  }
}
