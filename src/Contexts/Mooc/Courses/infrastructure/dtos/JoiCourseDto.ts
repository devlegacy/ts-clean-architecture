import { JoiSchema } from 'joi-class-decorators'

import { Joi } from '@/Contexts/Shared/infrastructure/joi'

export class JoiCourseDto {
  @JoiSchema(Joi.string().required())
  readonly id!: string

  @JoiSchema(Joi.string().required())
  readonly name!: string

  @JoiSchema(Joi.string().optional())
  readonly duration?: string
}
