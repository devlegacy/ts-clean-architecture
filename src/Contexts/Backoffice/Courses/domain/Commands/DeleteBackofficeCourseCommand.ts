import { Command } from '@/Contexts/Shared/domain'

import { BackofficeCoursePrimitiveDto } from '../BackofficeCourse'

type Params = Pick<BackofficeCoursePrimitiveDto, 'id'>

export class DeleteBackofficeCourseCommand extends Command {
  readonly id: string
  constructor({ id }: Params) {
    super()
    this.id = id
  }
}
