import { Command } from '@/Contexts/Shared/domain'

import { CoursePrimitiveType } from './Course'

type Params = CoursePrimitiveType

// Immutable
export class CreateCourseCommand extends Command {
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
