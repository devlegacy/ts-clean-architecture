import { ZodRequestCourseSchema } from '@/apps/mooc/backend/controllers/Courses/validations/ZodRequestCourseSchema'
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
import { Request, Response } from '@/Contexts/Shared/infrastructure/platform-fastify'
import {
  ObjectIdPipe as JoiMongoIdPipe,
  PageNumberPipe,
} from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi/Pipes'
import { MongoIdPipe as ZodMongoIdPipe } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Zod/Pipes'

import { JoiCourseRequestSchema, JoiCoursesRequestSchema } from '../Courses/validations'
import { IndexQueryRequestSchema, IndexRequestHeadersSchema, UserRequestSchema } from './validations'

// Los controllers regresan promesas<any> sin excepciones, los errores se propagan hasta el Server que instancia los controllers

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
  joi(@Body() course: JoiCourseRequestSchema) {
    return course
  }

  @Post('joi/array')
  joiArray(@Body() courses: JoiCoursesRequestSchema) {
    return courses
  }

  @Post('zod')
  zod(@Body() course: ZodRequestCourseSchema) {
    return course
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('params/:any/:any/:other')
  params(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: IndexQueryRequestSchema,
    @Param() params: Record<string, unknown>,
    @Body() body: UserRequestSchema,
    @Headers() headers: IndexRequestHeadersSchema
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
