import { AggregateRoot } from '@/Contexts/Shared/domain/aggregate-root'

import { CourseDuration } from '../../Shared/domain/Courses/CourseDuration'
import { CourseId } from '../../Shared/domain/Courses/CourseId'
import { CourseName } from '../../Shared/domain/Courses/CourseName'

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

  static fromPrimitives(plainData: { id: string; name: string; duration?: string }): Course {
    // return new Course({
    //   id: new CourseId(plainData.id),
    //   name: new CourseName(plainData.name),
    //   duration: !plainData.duration ? undefined : new CourseDuration(plainData.duration)
    // })
    return new Course(
      new CourseId(plainData.id),
      new CourseName(plainData.name),
      !plainData.duration ? undefined : new CourseDuration(plainData.duration)
    )
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      duration: this.duration?.value
    }
  }
}
