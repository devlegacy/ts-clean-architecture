import { JoiSchema } from 'joi-class-decorators'

import { CREATE, Joi, UPDATE } from '@/Contexts/Shared/infrastructure/RequestValidation/Joi'

/**
 * NOTE: Validaciones a nivel de protocolo de comunicación (transporte de esta capa / Ruta - Controlador)
 * No validaciones de dominio
 *
 * Se asume solapamiento
 * Se "duplica" responsabilidad
 *
 * Restricciones de integridad de dominio vs Validaciones capa de transporte/peticiones/protocolo de comunicación
 */

export class CourseRequestDto {
  @JoiSchema([CREATE], Joi.string().required())
  @JoiSchema([UPDATE], Joi.string().required())
  readonly id!: string

  @JoiSchema([CREATE], Joi.string().required())
  @JoiSchema([UPDATE], Joi.string().optional())
  readonly name!: string

  @JoiSchema([CREATE], Joi.string().optional())
  @JoiSchema([UPDATE], Joi.string().optional())
  readonly duration?: string

  @JoiSchema(
    [CREATE],
    Joi.date()
      .optional()
      .default(() => new Date())
  )
  readonly createdAt!: Date

  @JoiSchema(
    [CREATE],
    Joi.date()
      .optional()
      .default(() => new Date())
  )
  @JoiSchema(
    [UPDATE],
    Joi.date()
      .optional()
      .default(() => new Date())
  )
  readonly updatedAt!: Date
}
