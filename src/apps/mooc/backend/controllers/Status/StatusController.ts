import {
  config,
} from '#@/src/Contexts/Mooc/Shared/infrastructure/index.js'
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
} from '#@/src/Contexts/Shared/domain/Common/index.js'
import type {
  Request, Response,
} from '#@/src/Contexts/Shared/infrastructure/Fastify/index.js'
import {
  JoiObjectIdPipe,
  JoiPageNumberPipe,
} from '#@/src/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi/Pipes/index.js'
import {
  ZodObjectIdPipe,
} from '#@/src/Contexts/Shared/infrastructure/RequestSchemaValidation/Zod/Pipes/index.js'

import {
  JoiCourseRequestSchema,
  JoiCoursesRequestSchema,
  ZodRequestCourseSchema,
} from '../Courses/validations/index.js'
import {
  IndexQueryRequestSchema, IndexRequestHeadersSchema, UserRequestSchema,
} from './validations/index.js'

// Los controllers regresan promesas<any> sin excepciones, los errores se propagan hasta el Server que instancia los controllers

@Controller('status')
export class StatusController {
  @HttpCode(HttpStatus.OK)
  @Get()
  index() {
    // No DB connection
    return {}
  }

  @HttpCode(HttpStatus.OK)
  @Get('configs')
  config() {
    const properties = config.getProperties()
    return properties
  }

  @HttpCode(HttpStatus.OK)
  @Get('changed-config')
  configChanger() {
    const properties = config.getProperties()
    const response: {
      pre?: typeof properties
      post?: typeof properties
    } = {
      pre: properties,
      post: undefined,
    }

    config.set('log.level', 'debug')
    // changes for all the app flow
    response.post = config.getProperties()

    return response
  }

  @Post('joi/pipe/:mongoId')
  mongoPipe(@Param('mongoId', JoiObjectIdPipe) mongoId: string) {
    return {
      mongoId,
    }
  }

  @Post('zod/pipe/:mongoId')
  zodPipe(@Param('mongoId', ZodObjectIdPipe) mongoId: string) {
    return {
      mongoId,
    }
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
    @Body('name') name: string,
    @Headers() headers: IndexRequestHeadersSchema,
  ) {
    const hostname = req.hostname ?? 'no hostname'

    res.status(HttpStatus.OK)

    req.log.info(headers['x-context-account'])

    return {
      hostname,
      query,
      params,
      body,
      name,
      headers,
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('helpers')
  helpers(
    @Query('limit') limit: number,
    @Query('page', JoiPageNumberPipe) page: number,
    @Headers('x-context-account', JoiObjectIdPipe) account: string,
  ) {
    return {
      page,
      limit,
      account,
    }
  }
}
