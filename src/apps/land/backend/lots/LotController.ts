import {
  CreateLotCommand,
  FindLotQuery,
  LotResponse,
} from '#@/src/Contexts/Land/Lots/application/index.js'
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '#@/src/Contexts/Shared/domain/Common/index.js'
import {
  CommandBus,
  QueryBus,
} from '#@/src/Contexts/Shared/domain/index.js'
import {
  JoiUuidPipe,
} from '#@/src/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi/Pipes/index.js'

import {
  LotRequestSchema,
} from './LotRequestSchema.js'

@Controller('blocks/:block/lots')
export class LotController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  async show(@Param('id', JoiUuidPipe) id: string) {
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
      lot.updatedAt,
    )

    await this.commandBus.dispatch(command)

    return {}
  }
}
