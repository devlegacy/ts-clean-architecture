import {
  JoiSchema,
} from 'joi-class-decorators'

import {
  Joi,
} from '#@/src/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi/index.js'

const id = Joi.string()
  .trim()
  .guid({
    version: [
      'uuidv7',
    ],
  })

export class CartRequestDto {
  @JoiSchema(id.required())
  readonly id!: string

  @JoiSchema(id.required())
  readonly userId!: string
}
