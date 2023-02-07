import { FastifySchema } from 'fastify'

import { CourseRequestDto } from './dtos/CourseRequestDto'

export const UpdateRequestSchema: FastifySchema = {
  body: CourseRequestDto,
}
