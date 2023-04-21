import { CreatePriceCommand } from '@/Contexts/Land/Prices/application'
import { PriceRequestDto } from '@/Contexts/Land/Prices/infrastructure'
import { CommandBus } from '@/Contexts/Shared/domain'
import { Body, Controller, Post } from '@/Contexts/Shared/domain/Common'

@Controller('prices')
export class PriceController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() price: PriceRequestDto) {
    const command = new CreatePriceCommand(price.id, price.downPayment, price.payment, price.createdAt, price.updatedAt)

    await this.commandBus.dispatch(command)

    return {}
  }
}
