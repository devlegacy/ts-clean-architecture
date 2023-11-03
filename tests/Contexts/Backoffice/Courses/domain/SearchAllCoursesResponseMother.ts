import { BackofficeCoursesResponse } from '@/Contexts/Backoffice/Courses/application/index.js'
import { BackofficeCourse } from '@/Contexts/Backoffice/Courses/domain/index.js'

export class SearchAllCoursesResponseMother {
  static create(courses: BackofficeCourse[]) {
    return new BackofficeCoursesResponse(courses)
  }
}
