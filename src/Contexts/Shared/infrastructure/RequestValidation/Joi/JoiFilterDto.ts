import { JoiSchema } from 'joi-class-decorators'

import { Joi } from './index'

const field = Joi.string().trim().required()
const operator = Joi.string().trim().required() // From enum
const value = Joi.string().trim().required()

const filter = Joi.object({
  field,
  operator,
  value,
})
const filters = Joi.array().items(filter)

export class JoiFilterDto {
  @JoiSchema(filters.optional())
  readonly filters?: any[]
}
