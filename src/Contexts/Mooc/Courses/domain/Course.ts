import { AggregateRoot, NonFunctionProperties, PrimitiveProperties } from '@/Contexts/Shared/domain'

import { CourseId } from '../../Shared/domain'
import { CourseDuration, CourseName } from './value-object'

type CourseProps = NonFunctionProperties<Course>
type CoursePrimitiveProps = PrimitiveProperties<CourseProps>

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

  static fromPrimitives(primitive: CoursePrimitiveProps): Course {
    // return new Course({
    //   id: new CourseId(primitive.id),
    //   name: new CourseName(primitive.name),
    //   duration: !primitive.duration ? undefined : new CourseDuration(primitive.duration)
    // })
    return new Course(
      new CourseId(primitive.id),
      new CourseName(primitive.name),
      !primitive.duration ? undefined : new CourseDuration(primitive.duration)
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
