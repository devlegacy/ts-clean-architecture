import { Command } from '@/Contexts/Shared/domain'

export class DeleteBlockCommand extends Command {
  constructor(readonly id: string) {
    super()
  }
}
