import { Controller, Get } from '@/Contexts/Shared/domain/Common'

@Controller('status')
export class StatusController {
  @Get()
  index() {
    return {}
  }
}
