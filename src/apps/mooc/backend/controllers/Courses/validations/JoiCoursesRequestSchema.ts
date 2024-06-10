import {
  JoiSchema,
} from '#@/src/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi/index.js'

import {
  JoiCourseRequestSchema,
} from './JoiCourseRequestSchema.js'

export class JoiCoursesRequestSchema {
  @JoiSchema([
    JoiCourseRequestSchema,
  ], (arraySchema) => arraySchema.required(), (schema) => schema.required())
  readonly courses?: string
}
