import type { FastifySchema } from 'fastify'

import { CourseRequestSchema } from './CourseRequestSchema.js'

export const UpdateRequestSchema: FastifySchema = {
  body: CourseRequestSchema,
}
