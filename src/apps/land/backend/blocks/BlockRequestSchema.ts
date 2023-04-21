import { JoiSchema } from 'joi-class-decorators'

import { CREATE, Joi, UPDATE } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi'

const id = Joi.string().uuid({ version: 'uuidv4' }).trim()
const boundary = Joi.string().trim()
// const availability = Joi.valid(...Object.values(Availability))

export class BlockRequestSchema {
  @JoiSchema([CREATE], id.required())
  @JoiSchema([UPDATE], id.required())
  readonly id!: string

  @JoiSchema([CREATE], Joi.string().trim().required())
  @JoiSchema([UPDATE], Joi.string().trim().optional())
  readonly block!: string

  @JoiSchema([CREATE], Joi.number().required())
  @JoiSchema([UPDATE], Joi.number().optional())
  readonly area!: number

  @JoiSchema([CREATE], Joi.string().trim().required())
  @JoiSchema([UPDATE], Joi.string().trim().optional())
  readonly street!: string

  @JoiSchema([CREATE], boundary.required())
  @JoiSchema([UPDATE], boundary.optional())
  readonly northBoundary!: string

  @JoiSchema([CREATE], boundary.required())
  @JoiSchema([UPDATE], boundary.optional())
  readonly northeastBoundary!: string

  @JoiSchema([CREATE], boundary.required())
  @JoiSchema([UPDATE], boundary.optional())
  readonly eastBoundary!: string

  @JoiSchema([CREATE], boundary.required())
  @JoiSchema([UPDATE], boundary.optional())
  readonly southeastBoundary!: string

  @JoiSchema([CREATE], boundary.required())
  @JoiSchema([UPDATE], boundary.optional())
  readonly southBoundary!: string

  @JoiSchema([CREATE], boundary.required())
  @JoiSchema([UPDATE], boundary.optional())
  readonly southwestBoundary!: string

  @JoiSchema([CREATE], boundary.required())
  @JoiSchema([UPDATE], boundary.optional())
  readonly westBoundary!: string

  @JoiSchema([CREATE], boundary.required())
  @JoiSchema([UPDATE], boundary.optional())
  readonly northwestBoundary!: string

  @JoiSchema(
    [CREATE],
    Joi.date()
      .optional()
      .default(() => new Date())
  )
  readonly createdAt!: Date

  @JoiSchema(
    Joi.date()
      .optional()
      .default(() => new Date())
  )
  readonly updatedAt!: Date
}
