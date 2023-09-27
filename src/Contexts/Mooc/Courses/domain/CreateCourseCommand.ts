import { Command } from '@/Contexts/Shared/domain/index.js'

import type { CoursePrimitiveType } from './Course.js'

// alt CommandRequest
type Request = CoursePrimitiveType

// Immutable
export class CreateCourseCommand extends Command {
  readonly id: string
  readonly name: string
  readonly duration?: string

  constructor({ id, name, duration }: Request) {
    super()
    this.id = id
    this.name = name
    this.duration = duration
  }
}
