import { CREATE, Joi, JoiSchema, UPDATE } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi'

const string = Joi.string().trim()
const date = Joi.date()
/**
 * NOTE: Validaciones a nivel de protocolo de comunicación (transporte de esta capa / Ruta - Controlador)
 * No validaciones de dominio
 *
 * Se asume solapamiento
 * Se "duplica" responsabilidad
 *
 * Restricciones de integridad de dominio vs Validaciones capa de transporte/peticiones/protocolo de comunicación
 */
export class CourseRequestSchema {
  @JoiSchema([CREATE], string.required())
  @JoiSchema([UPDATE], string.required())
  readonly id!: string

  @JoiSchema([CREATE], string.required())
  @JoiSchema([UPDATE], string.optional())
  readonly name!: string

  @JoiSchema([CREATE], string.optional())
  @JoiSchema([UPDATE], string.optional())
  readonly duration?: string

  @JoiSchema([CREATE], date.optional().default(() => new Date()))
  readonly createdAt!: Date

  @JoiSchema([CREATE], date.optional().default(() => new Date()))
  @JoiSchema([UPDATE], date.optional().default(() => new Date()))
  readonly updatedAt!: Date
}
