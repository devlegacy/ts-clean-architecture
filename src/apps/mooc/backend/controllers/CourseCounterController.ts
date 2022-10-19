import { CoursesCounterFinder } from '@/Contexts/Mooc/CoursesCounter/application'
import { Controller, Get } from '@/Contexts/Shared/infrastructure/common'

@Controller('courses-counter')
export class CoursesCounterController {
  constructor(private coursesCounterFinder: CoursesCounterFinder) {}

  @Get()
  async show() {
    const total = await this.coursesCounterFinder.run()
    return { total }
  }
}
