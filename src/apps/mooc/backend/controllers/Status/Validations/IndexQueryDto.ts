import { JoiSchema, JoiSchemaOptions } from 'joi-class-decorators'

import { Joi } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi'

@JoiSchemaOptions({
  allowUnknown: false,
})
export class IndexQueryDto {
  @JoiSchema(Joi.number().required())
  page!: number

  @JoiSchema(Joi.number().required())
  limit!: number
}
