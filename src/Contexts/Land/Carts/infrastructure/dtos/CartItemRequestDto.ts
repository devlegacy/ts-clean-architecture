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

export class CartItemRequestDto {
  @JoiSchema(id.required())
  readonly id!: string

  @JoiSchema(id.required())
  readonly itemId!: string

  @JoiSchema(Joi.number().required())
  readonly quantity!: number

  @JoiSchema(Joi.number().required())
  readonly price!: number

  @JoiSchema(Joi.string().trim()
    .required())
  readonly currency!: string
}
