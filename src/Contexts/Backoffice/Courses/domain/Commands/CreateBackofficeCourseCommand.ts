import { Command } from '@/Contexts/Shared/domain'

import { BackofficeCoursePrimitiveType } from '../BackofficeCourse'

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
