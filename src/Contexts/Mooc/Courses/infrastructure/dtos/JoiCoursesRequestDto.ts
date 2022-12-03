import { JoiSchema } from 'joi-class-decorators'

import { JoiCourseRequestDto } from './JoiCourseRequestDto'

export class JoiCoursesRequestDto {
  @JoiSchema([JoiCourseRequestDto], (arraySchema) => arraySchema.required(), (schema) => schema.required())
  readonly courses?: string
}
