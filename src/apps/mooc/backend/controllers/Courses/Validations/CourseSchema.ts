import { FastifySchema } from 'fastify'

import { CourseRequestSchema } from './CourseRequestSchema'

export const UpdateRequestSchema: FastifySchema = {
  body: CourseRequestSchema,
}
