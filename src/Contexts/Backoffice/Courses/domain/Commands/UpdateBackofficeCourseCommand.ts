import {
  Command,
} from '#@/src/Contexts/Shared/domain/index.js'

import type {
  BackofficeCoursePrimitiveType,
} from '../BackofficeCourse.js'

type Params = BackofficeCoursePrimitiveType

// Immutable
// Escalares | Primitivos

export class UpdateBackofficeCourseCommand extends Command {
  readonly id: string
  readonly name: string
  readonly duration?: string
  readonly updatedAt?: Date

  constructor({
    id, name, duration, updatedAt,
  }: Params) {
    super()
    this.id = id
    this.name = name
    this.duration = duration
    this.updatedAt = updatedAt
  }
}
