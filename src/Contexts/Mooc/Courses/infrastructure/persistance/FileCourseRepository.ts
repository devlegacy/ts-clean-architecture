import { deserialize, serialize } from 'bson'
import fs from 'fs'

import { Course, CourseRepository } from '../../domain'

export class FileCourseRepository implements CourseRepository {
  private FILE_PATH = `${__dirname}/Courses`

  async save(course: Course) {
    fs.promises.writeFile(this.filePath(course.id.value), serialize(course))
  }

  async search(courseId: string): Promise<Course> {
    const courseData = await fs.promises.readFile(this.filePath(courseId))
    const { id, name, duration } = deserialize(courseData)

    return new Course(id, name, duration)
  }

  private filePath(id: string) {
    return `${this.FILE_PATH}.${id}.repo`
  }
}
