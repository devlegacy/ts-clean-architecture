import { Command } from '@/Contexts/Shared/domain'

import { BackofficeCoursePrimitiveType } from '../BackofficeCourse'

type Params = Pick<BackofficeCoursePrimitiveType, 'id'>

export class DeleteBackofficeCourseCommand extends Command {
  readonly id: string
  constructor({ id }: Params) {
    super()
    this.id = id
  }
}
