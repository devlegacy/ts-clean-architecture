import {
  BackofficeCoursesResponse,
} from '#@/src/Contexts/Backoffice/Courses/application/index.js'
import {
  BackofficeCourse,
} from '#@/src/Contexts/Backoffice/Courses/domain/index.js'

export class SearchAllCoursesResponseMother {
  static create(courses: BackofficeCourse[]) {
    return new BackofficeCoursesResponse(courses)
  }
}
