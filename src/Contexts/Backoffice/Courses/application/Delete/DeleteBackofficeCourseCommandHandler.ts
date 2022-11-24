import { injectable } from 'tsyringe'

import { Command, CommandHandler } from '@/Contexts/Shared/domain'

import { BackofficeCourseId, DeleteBackofficeCourseCommand } from '../../domain'
import { BackofficeCourseDeleter } from './BackofficeCourseDeleter'

@injectable()
export class DeleteBackofficeCourseCommandHandler implements CommandHandler<DeleteBackofficeCourseCommand> {
  constructor(private readonly deleter: BackofficeCourseDeleter) {}

  subscribedTo(): Command {
    return DeleteBackofficeCourseCommand
  }

  async handle(command: DeleteBackofficeCourseCommand): Promise<void> {
    const id = new BackofficeCourseId(command.id)

    await this.deleter.run(id)
  }
}
