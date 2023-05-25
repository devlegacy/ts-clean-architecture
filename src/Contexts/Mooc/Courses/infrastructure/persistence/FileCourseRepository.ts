import { deserialize, serialize } from 'bson'
import { readFile, writeFile } from 'fs/promises'

import { Criteria } from '@/Contexts/Shared/domain'

import { Course, CoursePrimitiveType, CourseRepository } from '../../domain'

export class FileCourseRepository implements CourseRepository {
  #FILE_PATH = `${__dirname}/Courses`

  async all(): Promise<Course[]> {
    return []
  }

  async search(_criteria: Criteria): Promise<Course[]> {
    return []
  }

  async save(course: Course) {
    const path = this.#path(course.id.value)
    // console.log(path)
    await writeFile(path, serialize(course))
  }

  async getById(courseId: CoursePrimitiveType['id']): Promise<Course> {
    const path = this.#path(courseId)
    // console.log(path)
    const courseBuffer = await readFile(path)
    const { id, name, duration } = deserialize(courseBuffer)
    const course = new Course(id, name, duration)

    return course
  }

  #path(id: string) {
    return `${this.#FILE_PATH}.${id}.repo`
  }
}
