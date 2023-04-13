import { JoiSchema, JoiSchemaOptions } from 'joi-class-decorators'

import { Joi } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi'

@JoiSchemaOptions({
  allowUnknown: false,
})
export class IndexHeadersDto {
  @JoiSchema(Joi.string().trim().objectId().required())
  'x-context-user'!: string

  @JoiSchema(Joi.string().trim().objectId().required())
  'x-context-account'!: string
}
