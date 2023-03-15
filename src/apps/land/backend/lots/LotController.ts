import { inject } from 'tsyringe'

import { CreateLotCommand } from '@/Contexts/Land/Lots/application'
import { CommandBus } from '@/Contexts/Shared/domain'
import { Body, Controller, Post } from '@/Contexts/Shared/infrastructure/common'

import { TYPES } from '../../modules/types'
import { LotRequestSchema } from './LotRequestSchema'

@Controller('blocks/:block/lots')
export class LotController {
  constructor(@inject(TYPES.CommandBus) private readonly commandBus: CommandBus) {}

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
