import { Course } from './Course'

// TODO: Define
export const COURSE_REPOSITORY_TOKEN = 'CourseRepository'
export const COURSE_REPOSITORY_KEY = 'CourseRepository'

export interface CourseRepository {
  save(course: Course): Promise<void>
}
