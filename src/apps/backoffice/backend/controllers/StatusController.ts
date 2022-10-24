import { Controller, Get, HttpCode, HttpStatus } from '@/Contexts/Shared/infrastructure/common'

@Controller('status')
export class StatusController {
  @HttpCode(HttpStatus.OK)
  @Get()
  index() {
    return {}
  }
}
