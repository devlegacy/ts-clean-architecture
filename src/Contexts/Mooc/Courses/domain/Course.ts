import { AggregateRoot, Entity, Primitives } from '@/Contexts/Shared/domain'

import { CourseId } from '../../Shared/domain'
import { CourseCreatedDomainEvent } from './CourseCreatedDomainEvent'
import { CourseDuration, CourseName } from './ValueObjects'

export type CourseEntityType = Entity<Course>
export type CoursePrimitiveType = Primitives<Course>

export class Course extends AggregateRoot {
  readonly id: CourseId
  readonly name: CourseName
  readonly duration?: CourseDuration
  // Timestamps
  // readonly createdAt?: Date
  // readonly updatedAt?: Date
  // readonly deletedAt?: Date

  // constructor({ id, name, duration }: { id: string; name: string; duration: string }) {
  constructor(
    id: CourseId,
    name: CourseName,
    duration?: CourseDuration
    // createdAt?: Date,
    // updatedAt?: Date,
    // deletedAt?: Date
  ) {
    // constructor(dto: { id: CourseId; name: CourseName; duration?: CourseDuration }) {
    super()
    this.id = id
    this.name = name
    this.duration = duration
    // this.createdAt = createdAt ?? new Date()
    // this.updatedAt = updatedAt ?? new Date()
    // this.deletedAt = deletedAt
    // Object.assign(this, dto)
  }

  static create(id: CourseId, name: CourseName, duration?: CourseDuration) {
    const course = new Course(id, name, duration)

    const event = new CourseCreatedDomainEvent({
      aggregateId: id.value,
      duration: duration?.value,
      name: name.value,
    })

    course.record(event)

    return course
  }

  static override fromPrimitives(data: CoursePrimitiveType): Course {
    // return new Course({
    //   id: new CourseId(props.id),
    //   name: new CourseName(props.name),
    //   duration: !props.duration ? undefined : new CourseDuration(props.duration)
    // })
    const entity = new Course(
      new CourseId(data.id),
      new CourseName(data.name),
      data.duration ? new CourseDuration(data.duration) : undefined
      // data.createdAt ? data.createdAt : undefined,
      // data.updatedAt ? data.updatedAt : undefined,
      // data.deletedAt ? data.deletedAt : undefined
    )

    return entity
  }

  toPrimitives(): CoursePrimitiveType {
    const primitives = {
      id: this.id.value,
      name: this.name.value,
      duration: this.duration?.value,
      // createdAt: this.createdAt,
      // updatedAt: this.updatedAt,
      // deletedAt: this.deletedAt
    }

    return primitives
  }
}
