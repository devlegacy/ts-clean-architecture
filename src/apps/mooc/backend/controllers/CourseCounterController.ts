import { Controller, Get } from '@/Contexts/Shared/infrastructure'

@Controller('courses-counter')
export class CoursesCounterController {
  @Get()
  show() {
    return {}
  }
}
