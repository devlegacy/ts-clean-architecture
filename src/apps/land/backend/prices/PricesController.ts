import {
  CreatePriceCommand,
} from '#@/src/Contexts/Land/Prices/application/index.js'
import {
  PriceRequestDto,
} from '#@/src/Contexts/Land/Prices/infrastructure/index.js'
import {
  Body,
  Controller,
  Post,
} from '#@/src/Contexts/Shared/domain/Common/index.js'
import {
  CommandBus,
} from '#@/src/Contexts/Shared/domain/index.js'

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
