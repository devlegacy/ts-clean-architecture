import Joi from 'joi'
import { JoiSchema, JoiSchemaOptions } from 'joi-class-decorators'
// import { isValidObjectId } from 'mongoose'
// import { z } from 'zod'

// import { createZodDto } from '@/shared/zod'

/**
 * Note: Validaciones a nivel de protocolo de comunicación (transporte de esta capa / Ruta - Controlador)
 * No validaciones de dominio
 *
 * Se asume solapamiento
 * Se "duplica" responsabilidad
 *
 * Restricciones de integridad de dominio vs Validaciones capa de transporte/peticiones/protocolo de comunicación
 */

@JoiSchemaOptions({
  allowUnknown: false
})
export class CourseDto {
  @JoiSchema(Joi.string().required())
  id!: string

  @JoiSchema(Joi.string().required())
  name!: string

  @JoiSchema(Joi.string().optional())
  duration?: string
}

// export const Course = z.object({
//   id: z
//     .string()
//     .min(400)
//     .refine((value) => isValidObjectId(value)),
//   name: z.number(),
//   duration: z.number()
// })

// export class CourseDto extends createZodDto(Course) {}
