import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'

import { deserialize, serialize } from 'bson'

import { Criteria } from '@/Contexts/Shared/domain/index.js'

import { Course, type CoursePrimitiveType, CourseRepository } from '../../domain/index.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

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
    await writeFile(path, serialize(course.toPrimitives()))
  }

  // a local implementation that avoids to bring it to domain, but it leaves dirty the test file
  async getById(courseId: CoursePrimitiveType['id']): Promise<Course> {
    const path = this.#path(courseId)
    const courseBuffer = await readFile(path)
    const { id, name, duration } = deserialize(courseBuffer) as CoursePrimitiveType
    const course = Course.fromPrimitives({
      id,
      name,
      duration,
    })

    return course
  }

  #path(id: string) {
    return `${this.#FILE_PATH}.${id}.repo`
  }
}
