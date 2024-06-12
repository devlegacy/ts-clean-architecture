import {
  Command,
} from '#@/src/Contexts/Shared/domain/index.js'

import type {
  BackofficeCoursePrimitiveType,
} from '../BackofficeCourse.js'

type Params = Pick<BackofficeCoursePrimitiveType, 'id'>

export class DeleteBackofficeCourseCommand extends Command {
  readonly id: string
  constructor({
    id,
  }: Params) {
    super()
    this.id = id
  }
}
