import HttpStatus from 'http-status'

import { Body, Controller, Get, Headers, HttpCode, Param, Post, Query, Req, Res } from '@/shared/common'

import { IndexHeadersDto } from './dtos/index-headers.dto'
import { IndexQueryDto } from './dtos/index-query.dto'
import { UserDto } from './dtos/user.dto'

@Controller('/status')
export class StatusController {
  @HttpCode(HttpStatus.OK)
  @Get('/')
  index() {
    return {}
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/params/:any/:any/:other')
  params(
    @Req() req: HttpRequest,
    @Res() res: HttpResponse,
    @Query() query: IndexQueryDto,
    @Param() params: Record<string, unknown>,
    @Body() body: UserDto,
    @Headers() headers: IndexHeadersDto
  ) {
    // console.log(this)
    const hostname = req.hostname ?? 'no hostname'

    res.status(HttpStatus.OK)

    console.log(headers['x-context-account'])

    return {
      hostname,
      query,
      params,
      body,
      headers
    }
  }
}
