import { AggregateRoot, NonFunctionProperties, PrimitiveProperties } from '@/Contexts/Shared/domain'

import { CourseId } from '../../Shared/domain'
import { CourseDuration, CourseName, CourseType } from './value-object'

type CourseProps = NonFunctionProperties<Course>
type CoursePrimitiveProps = PrimitiveProperties<CourseProps>

export class Course extends AggregateRoot {
  readonly id: CourseId
  readonly name: CourseName
  readonly duration?: CourseDuration
  readonly type?: CourseType

  // constructor({ id, name, duration }: { id: string; name: string; duration: string }) {
  constructor(id: CourseId, name: CourseName, duration?: CourseDuration) {
    // constructor(dto: { id: CourseId; name: CourseName; duration?: CourseDuration }) {
    super()
    this.id = id
    this.name = name
    this.duration = duration
    // Object.assign(this, dto)
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
      !props.duration ? undefined : new CourseDuration(props.duration)
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
