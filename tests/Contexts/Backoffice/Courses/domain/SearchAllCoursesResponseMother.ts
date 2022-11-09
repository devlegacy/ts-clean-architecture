import { BackofficeCoursesResponse } from '@/Contexts/Backoffice/Courses/application'
import { BackofficeCourse } from '@/Contexts/Backoffice/Courses/domain'

export class SearchAllCoursesResponseMother {
  static create(courses: BackofficeCourse[]) {
    return new BackofficeCoursesResponse(courses)
  }
}
