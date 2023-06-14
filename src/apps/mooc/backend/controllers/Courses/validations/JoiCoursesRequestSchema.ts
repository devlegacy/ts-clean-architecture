import { JoiSchema } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi'

import { JoiCourseRequestSchema } from './JoiCourseRequestSchema'

export class JoiCoursesRequestSchema {
  @JoiSchema([JoiCourseRequestSchema], (arraySchema) => arraySchema.required(), (schema) => schema.required())
  readonly courses?: string
}
