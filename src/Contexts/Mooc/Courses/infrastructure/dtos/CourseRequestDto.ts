import { JoiSchema } from 'joi-class-decorators'

import { Joi } from '@/Contexts/Shared/infrastructure/joi'

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
  @JoiSchema(Joi.string().required())
  readonly id!: string

  @JoiSchema(Joi.string().required())
  readonly name!: string

  @JoiSchema(Joi.string().optional())
  readonly duration?: string
}
