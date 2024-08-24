import {
  Command,
} from '#@/src/Contexts/Shared/domain/index.js'

export class CreateBlockCommand extends Command {
  constructor(
    readonly id: string,
    readonly block: string,
    readonly area: number,
    readonly street: string,
    readonly northBoundary: string,
    readonly northeastBoundary: string,
    readonly eastBoundary: string,
    readonly southeastBoundary: string,
    readonly southBoundary: string,
    readonly southwestBoundary: string,
    readonly westBoundary: string,
    readonly northwestBoundary: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date,
  ) {
    super()
  }
}
