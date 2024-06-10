import {
  Joi,
  JoiSchema,
} from '#@/src/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi/index.js'

export class JoiCourseRequestSchema {
  @JoiSchema(Joi.string().required())
  readonly id!: string

  @JoiSchema(Joi.string().required())
  readonly name!: string

  @JoiSchema(Joi.string().optional())
  readonly duration?: string
}
