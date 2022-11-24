import { Command } from '@/Contexts/Shared/domain'

import { BackofficeCoursePrimitiveDto } from './BackofficeCourse'

type Params = BackofficeCoursePrimitiveDto

// Immutable
// Escalares | Primitivos

export class UpdateBackofficeCourseCommand extends Command {
  readonly id: string
  readonly name: string
  readonly duration?: string
  readonly updatedAt?: Date

  constructor({ id, name, duration, updatedAt }: Params) {
    super()
    this.id = id
    this.name = name
    this.duration = duration
    this.updatedAt = updatedAt
  }
}
