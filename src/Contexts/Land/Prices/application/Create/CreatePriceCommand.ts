import { Command } from '@/Contexts/Shared/domain'

export class CreatePriceCommand extends Command {
  constructor(
    readonly id: string,
    readonly downPayment: number,
    readonly payment: number,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {
    super()
  }
}
