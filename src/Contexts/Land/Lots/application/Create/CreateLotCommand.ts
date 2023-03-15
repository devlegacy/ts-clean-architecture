import { Command } from '@/Contexts/Shared/domain'

export class CreateLotCommand extends Command {
  constructor(
    readonly id: string,
    readonly blockId: string,
    readonly lot: string,
    readonly area: number,
    readonly northBoundary: string,
    readonly northeastBoundary: string,
    readonly eastBoundary: string,
    readonly southeastBoundary: string,
    readonly southBoundary: string,
    readonly southwestBoundary: string,
    readonly westBoundary: string,
    readonly northwestBoundary: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    super()
  }
}
