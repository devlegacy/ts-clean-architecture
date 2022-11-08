import { BackofficeCourse } from './BackofficeCourse'

export interface BackofficeCourseRepository {
  save(course: BackofficeCourse): Promise<void>
  all(): Promise<BackofficeCourse[]>
}
