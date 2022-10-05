import { JoiSchema, JoiSchemaOptions } from 'joi-class-decorators'

import { Joi } from '@/Contexts/Shared/infrastructure/joi/joi'

@JoiSchemaOptions({
  allowUnknown: false
})
export class UserDto {
  @JoiSchema(Joi.string().required())
  name!: string

  @JoiSchema(Joi.number().required())
  age!: number
}
