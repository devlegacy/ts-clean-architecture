import { z } from 'zod'

import { createZodDto } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Zod'

const Course = z.object({
  id: z.string().min(400),
  // .refine((value) => isValidObjectId(value)),
  name: z.string(),
  duration: z.string(),
})

export class ZodCourseDto extends createZodDto(Course) {}
