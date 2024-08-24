import {
  Command,
} from '#@/src/Contexts/Shared/domain/index.js'

export class DeleteBlockCommand extends Command {
  constructor(readonly id: string) {
    super()
  }
}
