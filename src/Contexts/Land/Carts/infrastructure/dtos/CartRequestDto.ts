import { JoiSchema } from 'joi-class-decorators'

import { Joi } from '@/Contexts/Shared/infrastructure/RequestValidation/Joi'

const id = Joi.string()
  .trim()
  .guid({
    version: ['uuidv4'],
  })

export class CartRequestDto {
  @JoiSchema(id.required())
  readonly id!: string

  @JoiSchema(id.required())
  readonly userId!: string
}
