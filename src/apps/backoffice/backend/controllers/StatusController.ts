import { Controller, Get } from '@/Contexts/Shared/infrastructure/common'

@Controller('status')
export class StatusController {
  @Get()
  index() {
    return {}
  }
}
