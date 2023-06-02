import { Joi, JoiSchema } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi'

export class JoiCourseRequestDto {
  @JoiSchema(Joi.string().required())
  readonly id!: string

  @JoiSchema(Joi.string().required())
  readonly name!: string

  @JoiSchema(Joi.string().optional())
  readonly duration?: string
}
