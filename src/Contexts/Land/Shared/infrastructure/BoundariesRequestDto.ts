import {
  JoiSchema,
} from 'joi-class-decorators'

import {
  CREATE,
  Joi,
  UPDATE,
} from '#@/src/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi/index.js'

const boundary = Joi.string().trim()

export class BoundariesRequestDto {
  @JoiSchema(
    [
      CREATE,
    ],
    boundary.required(),
  )
  @JoiSchema(
    [
      UPDATE,
    ],
    boundary.optional(),
  )
  readonly north!: string

  @JoiSchema(
    [
      CREATE,
    ],
    boundary.required(),
  )
  @JoiSchema(
    [
      UPDATE,
    ],
    boundary.optional(),
  )
  readonly northeast!: string

  @JoiSchema(
    [
      CREATE,
    ],
    boundary.required(),
  )
  @JoiSchema(
    [
      UPDATE,
    ],
    boundary.optional(),
  )
  readonly east!: string

  @JoiSchema(
    [
      CREATE,
    ],
    boundary.required(),
  )
  @JoiSchema(
    [
      UPDATE,
    ],
    boundary.optional(),
  )
  readonly southeast!: string

  @JoiSchema(
    [
      CREATE,
    ],
    boundary.required(),
  )
  @JoiSchema(
    [
      UPDATE,
    ],
    boundary.optional(),
  )
  readonly south!: string

  @JoiSchema(
    [
      CREATE,
    ],
    boundary.required(),
  )
  @JoiSchema(
    [
      UPDATE,
    ],
    boundary.optional(),
  )
  readonly southwest!: string

  @JoiSchema(
    [
      CREATE,
    ],
    boundary.required(),
  )
  @JoiSchema(
    [
      UPDATE,
    ],
    boundary.optional(),
  )
  readonly west!: string

  @JoiSchema(
    [
      CREATE,
    ],
    boundary.required(),
  )
  @JoiSchema(
    [
      UPDATE,
    ],
    boundary.optional(),
  )
  readonly northwest!: string
}
