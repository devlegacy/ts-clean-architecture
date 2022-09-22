import { FastifySchema } from 'fastify'

import { CourseDto } from './dtos/CourseDto'

export const UpdateRequestSchema: FastifySchema = {
  body: CourseDto
}
