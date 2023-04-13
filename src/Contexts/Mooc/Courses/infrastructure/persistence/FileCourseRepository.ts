import { deserialize, serialize } from 'bson'
import { readFile, writeFile } from 'fs/promises'

import { Criteria } from '@/Contexts/Shared/domain'

import { Course, CoursePrimitiveType, CourseRepository } from '../../domain'

export class FileCourseRepository implements CourseRepository {
  private FILE_PATH = `${__dirname}/Courses`

  async all(): Promise<Course[]> {
    return []
  }

  async searchBy(_criteria: Criteria): Promise<Course[]> {
    return []
  }

  async save(course: Course) {
    writeFile(this.path(course.id.value), serialize(course))
  }

  async search(courseId: CoursePrimitiveType['id']): Promise<Course> {
    const courseData = await readFile(this.path(courseId))
    const { id, name, duration } = deserialize(courseData)

    return new Course(id, name, duration)
  }

  private path(id: string) {
    return `${this.FILE_PATH}.${id}.repo`
  }
}
