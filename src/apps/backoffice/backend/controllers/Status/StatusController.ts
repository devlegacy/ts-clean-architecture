import { Controller, Get } from '@/Contexts/Shared/domain/Common/index.js'

@Controller('status')
export class StatusController {
  @Get()
  index() {
    return {}
  }
}
