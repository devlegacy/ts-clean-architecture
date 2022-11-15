import { Command } from '@/Contexts/Shared/domain'

import { BackofficeCoursePrimitiveDto } from './BackofficeCourse'

type Params = BackofficeCoursePrimitiveDto

// Immutable

export class BackofficeCreateCourseCommand extends Command {
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
