import { BlockResponse, CreateBlockCommand, FindBlockQuery } from '@/Contexts/Land/Blocks/application'
import { DeleteBlockCommand } from '@/Contexts/Land/Blocks/application/Delete'
import { BlockSearcher } from '@/Contexts/Land/Blocks/application/Search/BlockSearcher'
import { CommandBus, QueryBus } from '@/Contexts/Shared/domain'
import { Body, Controller, Delete, Get, Param, Post, Query } from '@/Contexts/Shared/domain/Common'
import { UuidPipe } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi/Pipes'

import { BlockRequestSchema } from './BlockRequestSchema'

@Controller('blocks')
export class BlockController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly searcher: BlockSearcher
  ) {}

  @Get()
  async index(@Query('orderBy') _orderBy?: string, @Query('orderType') _orderType?: string) {
    const { blocks } = await this.searcher.run()
    return blocks
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
