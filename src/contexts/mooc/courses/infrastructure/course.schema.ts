import { FastifySchema } from 'fastify'

import { CourseDto } from './dtos/course.dto'

export const updateRequestSchema: FastifySchema = {
  body: CourseDto
}
