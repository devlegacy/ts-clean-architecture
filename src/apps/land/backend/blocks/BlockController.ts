import { inject } from 'tsyringe'

import { BlockResponse, CreateBlockCommand, FindBlockQuery } from '@/Contexts/Land/Blocks/application'
import { DeleteBlockCommand } from '@/Contexts/Land/Blocks/application/Delete'
import { CommandBus, QueryBus } from '@/Contexts/Shared/domain'
import { Body, Controller, Delete, Get, Param, Post, Query } from '@/Contexts/Shared/infrastructure/common'
import { UuidPipe } from '@/Contexts/Shared/infrastructure/RequestValidation/Joi/Pipes'

import { TYPES } from '../../modules/types'
import { BlockRequestSchema } from './BlockRequestSchema'

@Controller('blocks')
export class BlockController {
  constructor(
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus,
    @inject(TYPES.QueryBus) private readonly queryBus: QueryBus
  ) {}

  @Get()
  async index(@Query('orderBy') orderBy?: string, @Query('orderType') orderType?: string) {
    return {
      orderBy,
      orderType,
    }
  }

  @Get(':id')
  async show(@Param('id', UuidPipe) id: string) {
    const query = new FindBlockQuery(id)
    const block = await this.queryBus.ask<BlockResponse>(query)
    return block
  }

  @Post()
  async create(@Body() block: BlockRequestSchema) {
    const command = new CreateBlockCommand(
      block.id,
      block.block,
      block.area,
      block.street,
      block.northBoundary,
      block.northeastBoundary,
      block.eastBoundary,
      block.southeastBoundary,
      block.southBoundary,
      block.southwestBoundary,
      block.westBoundary,
      block.northwestBoundary,
      block.createdAt,
      block.updatedAt
    )

    await this.commandBus.dispatch(command)

    return {}
  }

  @Delete(':id')
  async delete(@Param('id', UuidPipe) id: string) {
    const command = new DeleteBlockCommand(id)
    await this.commandBus.dispatch(command)

    return {}
  }
}
