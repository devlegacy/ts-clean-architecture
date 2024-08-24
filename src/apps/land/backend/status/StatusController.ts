import {
  Controller,
  Get,
} from '#@/src/Contexts/Shared/domain/Common/index.js'

@Controller('status')
export class StatusController {
  @Get()
  index() {
    return {}
  }
}
