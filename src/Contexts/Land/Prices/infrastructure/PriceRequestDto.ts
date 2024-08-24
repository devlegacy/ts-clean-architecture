import {
  JoiSchema,
} from 'joi-class-decorators'

import {
  CREATE,
  Joi,
  UPDATE,
} from '#@/src/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi/index.js'

const id = Joi.string().uuid({
  version: 'uuidv4',
})
  .trim()

export class PriceRequestDto {
  @JoiSchema(id.required())
  readonly id!: string

  @JoiSchema(
    [
      CREATE,
    ],
    Joi.number().required(),
  )
  @JoiSchema(
    [
      UPDATE,
    ],
    Joi.number().optional(),
  )
  readonly downPayment!: number

  @JoiSchema(
    [
      CREATE,
    ],
    Joi.number().required(),
  )
  @JoiSchema(
    [
      UPDATE,
    ],
    Joi.number().optional(),
  )
  readonly payment!: number

  @JoiSchema(
    [
      CREATE,
    ],
    Joi.date()
      .optional()
      .default(() => new Date()),
  )
  readonly createdAt!: Date

  @JoiSchema(
    Joi.date()
      .optional()
      .default(() => new Date()),
  )
  readonly updatedAt!: Date
}
