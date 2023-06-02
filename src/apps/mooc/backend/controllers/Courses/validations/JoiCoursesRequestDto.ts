import { JoiSchema } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi'

import { JoiCourseRequestDto } from './JoiCourseRequestDto'

export class JoiCoursesRequestDto {
  @JoiSchema([JoiCourseRequestDto], (arraySchema) => arraySchema.required(), (schema) => schema.required())
  readonly courses?: string
}
