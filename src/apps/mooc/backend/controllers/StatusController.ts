import { IndexHeadersDto, IndexQueryDto, UserDto } from '@/Contexts/Mooc/Status/infrastructure'
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
  Res
} from '@/Contexts/Shared/infrastructure/common'
import { MongoIdPipe, PageNumberPipe } from '@/Contexts/Shared/infrastructure/pipes/joi'

@Controller('status')
export class StatusController {
  @HttpCode(HttpStatus.OK)
  @Get()
  index() {
    return {}
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
      headers
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('helpers')
  helpers(
    @Query('limit') limit: number,
    @Query('page', PageNumberPipe) page: number,
    @Headers('x-context-account', MongoIdPipe) account: string
  ) {
    return {
      page,
      limit,
      account
    }
  }
}
