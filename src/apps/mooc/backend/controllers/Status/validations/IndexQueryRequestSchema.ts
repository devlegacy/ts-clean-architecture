import {
  Joi,
  JoiSchema,
  JoiSchemaOptions,
} from '#@/src/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi/index.js'

@JoiSchemaOptions({
  allowUnknown: false,
})
export class IndexQueryRequestSchema {
  @JoiSchema(Joi.number().required())
  page!: number

  @JoiSchema(Joi.number().required())
  limit!: number
}
