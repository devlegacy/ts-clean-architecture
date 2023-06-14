import { Joi, JoiSchema, JoiSchemaOptions } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi'

@JoiSchemaOptions({
  allowUnknown: false,
})
export class IndexQueryRequestSchema {
  @JoiSchema(Joi.number().required())
  page!: number

  @JoiSchema(Joi.number().required())
  limit!: number
}
