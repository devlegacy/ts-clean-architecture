import { readFile, writeFile } from 'node:fs/promises'

import { deserialize, serialize } from 'bson'

import { Criteria } from '@/Contexts/Shared/domain'

import { Course, CourseEntityType, CoursePrimitiveType, CourseRepository } from '../../domain'

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
    await writeFile(path, serialize(course))
  }

  // a local implementation that avoids to bring it to domain, but it leaves dirty the test file
  async getById(courseId: CoursePrimitiveType['id']): Promise<Course> {
    const path = this.#path(courseId)
    const courseBuffer = await readFile(path)
    const { id, name, duration } = deserialize(courseBuffer) as CourseEntityType
    const course = new Course(id, name, duration)

    return course
  }

  #path(id: string) {
    return `${this.#FILE_PATH}.${id}.repo`
  }
}
