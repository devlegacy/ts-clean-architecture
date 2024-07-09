import {
  type BackofficeCoursePrimitiveType,
} from '#@/src/Contexts/Backoffice/Courses/domain/index.js'
import {
  Command,
} from '#@/src/Contexts/Shared/domain/index.js'

type Params = BackofficeCoursePrimitiveType

// Immutable
// Escalares | Primitivos

export class CreateBackofficeCourseCommand extends Command {
  readonly id: string
  readonly name: string
  readonly duration?: string

  constructor({
    id, name, duration,
  }: Params) {
    super()
    this.id = id
    this.name = name
    this.duration = duration
  }
}
