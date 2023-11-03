import { Command } from '@/Contexts/Shared/domain/index.js'

import type { BackofficeCoursePrimitiveType } from '../BackofficeCourse.js'

type Params = BackofficeCoursePrimitiveType

// Immutable
// Escalares | Primitivos

export class CreateBackofficeCourseCommand extends Command {
  readonly id: string
  readonly name: string
  readonly duration?: string

  constructor({ id, name, duration }: Params) {
    super()
    this.id = id
    this.name = name
    this.duration = duration
  }
}
