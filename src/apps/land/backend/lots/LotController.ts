import { CreateLotCommand, FindLotQuery, LotResponse } from '@/Contexts/Land/Lots/application'
import { CommandBus, QueryBus } from '@/Contexts/Shared/domain'
import { Body, Controller, Get, Param, Post } from '@/Contexts/Shared/domain/Common'
import { UuidPipe } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi/Pipes'

import { LotRequestSchema } from './LotRequestSchema'

@Controller('blocks/:block/lots')
export class LotController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get(':id')
  async show(@Param('id', UuidPipe) id: string) {
    const query = new FindLotQuery(id)
    const lot = await this.queryBus.ask<LotResponse>(query)
    return lot
  }

  @Post()
  async create(@Body() lot: LotRequestSchema) {
    const command = new CreateLotCommand(
      lot.id,
      lot.blockId,
      lot.lot,
      lot.area,
      lot.northBoundary,
      lot.northeastBoundary,
      lot.eastBoundary,
      lot.southeastBoundary,
      lot.southBoundary,
      lot.southwestBoundary,
      lot.westBoundary,
      lot.northwestBoundary,
      lot.createdAt,
      lot.updatedAt
    )

    await this.commandBus.dispatch(command)

    return {}
  }
}
