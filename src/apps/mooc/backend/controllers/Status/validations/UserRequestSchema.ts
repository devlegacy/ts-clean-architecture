import { Joi, JoiSchema, JoiSchemaOptions } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi'

@JoiSchemaOptions({
  allowUnknown: false,
})
export class UserRequestSchema {
  @JoiSchema(Joi.string().required())
  name!: string

  @JoiSchema(Joi.number().required())
  age!: number
}
