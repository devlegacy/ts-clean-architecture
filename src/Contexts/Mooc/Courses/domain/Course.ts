import { AggregateRoot, NonFunctionProperties, PrimitiveProperties } from '@/Contexts/Shared/domain'

import { CourseId } from '../../Shared/domain'
import { CourseCreatedDomainEvent } from './CourseCreatedDomainEvent'
import { CourseDuration, CourseName } from './value-object'

type CourseProps = NonFunctionProperties<Course>
export type CoursePrimitiveProps = PrimitiveProperties<CourseProps>

export class Course extends AggregateRoot {
  readonly id: CourseId
  readonly name: CourseName
  readonly duration?: CourseDuration

  // constructor({ id, name, duration }: { id: string; name: string; duration: string }) {
  constructor(id: CourseId, name: CourseName, duration?: CourseDuration) {
    // constructor(dto: { id: CourseId; name: CourseName; duration?: CourseDuration }) {
    super()
    this.id = id
    this.name = name
    this.duration = duration
    // Object.assign(this, dto)
  }

  static create(id: CourseId, name: CourseName, duration?: CourseDuration) {
    const course = new Course(id, name, duration)

    course.record(
      new CourseCreatedDomainEvent({
        aggregateId: course.id.value,
        duration: course.duration?.value,
        name: course.name.value
      })
    )

    return course
  }

  static fromPrimitives(props: CoursePrimitiveProps): Course {
    // return new Course({
    //   id: new CourseId(props.id),
    //   name: new CourseName(props.name),
    //   duration: !props.duration ? undefined : new CourseDuration(props.duration)
    // })
    return new Course(
      new CourseId(props.id),
      new CourseName(props.name),
      props.duration ? new CourseDuration(props.duration) : undefined
    )
  }

  toPrimitives(): CoursePrimitiveProps {
    return {
      id: this.id.value,
      name: this.name.value,
      duration: this.duration?.value
    }
  }
}
