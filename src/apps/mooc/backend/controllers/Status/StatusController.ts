import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@/Contexts/Shared/domain/Common'
import {
  ObjectIdPipe as JoiMongoIdPipe,
  PageNumberPipe,
} from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi/Pipes'
import { MongoIdPipe as ZodMongoIdPipe } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Zod/Pipes'

import { JoiCourseRequestDto, JoiCoursesRequestDto } from '../Courses/Validations'
import { ZodCourseDto } from '../Courses/Validations/ZodCourseDto'
import { IndexHeadersDto, IndexQueryDto, UserDto } from './Validations'

@Controller('status')
export class StatusController {
  @HttpCode(HttpStatus.OK)
  @Get()
  index() {
    return {}
  }

  @Post('joi/pipe/:mongoId')
  mongoPipe(@Param('mongoId', JoiMongoIdPipe) mongoId: string) {
    return { mongoId }
  }

  @Post('zod/pipe/:mongoId')
  zodPipe(@Param('mongoId', ZodMongoIdPipe) mongoId: string) {
    return { mongoId }
  }

  @Post('joi')
  joi(@Body() course: JoiCourseRequestDto) {
    return course
  }

  @Post('joi/array')
  joiArray(@Body() courses: JoiCoursesRequestDto) {
    return courses
  }

  @Post('zod')
  zod(@Body() course: ZodCourseDto) {
    return course
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('params/:any/:any/:other')
  params(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: IndexQueryDto,
    @Param() params: Record<string, unknown>,
    @Body() body: UserDto,
    @Headers() headers: IndexHeadersDto
  ) {
    const hostname = req.hostname ?? 'no hostname'

    res.status(HttpStatus.OK)

    req.log.info(headers['x-context-account'])

    return {
      hostname,
      query,
      params,
      body,
      headers,
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('helpers')
  helpers(
    @Query('limit') limit: number,
    @Query('page', PageNumberPipe) page: number,
    @Headers('x-context-account', JoiMongoIdPipe) account: string
  ) {
    return {
      page,
      limit,
      account,
    }
  }
}
