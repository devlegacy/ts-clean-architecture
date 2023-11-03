import { Command } from '@/Contexts/Shared/domain/index.js'

export class DeleteBlockCommand extends Command {
  constructor(readonly id: string) {
    super()
  }
}
