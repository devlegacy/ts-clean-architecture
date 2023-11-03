import { Body, Controller, Get, Post } from '@/Contexts/Shared/domain/Common/index.js'

@Controller('accounts')
export class AccountController {
  @Get(':id')
  async show() {
    return {}
  }

  @Post()
  async create(@Body() body: unknown) {
    return body
  }

  @Post('deposit')
  async deposit() {
    return {}
  }
}
