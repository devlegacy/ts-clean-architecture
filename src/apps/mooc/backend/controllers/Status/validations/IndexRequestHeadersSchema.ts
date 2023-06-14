import { Joi, JoiSchema, JoiSchemaOptions } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi'

@JoiSchemaOptions({
  allowUnknown: false,
})
export class IndexRequestHeadersSchema {
  @JoiSchema(Joi.string().trim().objectId().required())
  'x-context-user'!: string

  @JoiSchema(Joi.string().trim().objectId().required())
  'x-context-account'!: string
}
