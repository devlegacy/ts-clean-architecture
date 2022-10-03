import HttpStatus from 'http-status'
import { ObjectId } from 'mongodb'

import { Controller, Delete, Get, Post, Put, Req, Res } from '@/Contexts/Shared/infrastructure'
import { UserCreator, UserDeleter, UserGetter, UserUpdater } from '@/Contexts/User/Users/application'

@Controller('/users')
export class UserController {
  constructor(
    private readonly userGetter: UserGetter,
    private readonly userCreator: UserCreator,
    private readonly userUpdater: UserUpdater,
    private readonly userDeleter: UserDeleter
  ) {}

  @Get('/')
  async index(@Req() req: Request, @Res() res: Response) {
    // const userGetter = new UserGetter(userRepository)
    const users = (await this.userGetter.run()).map((user) => user.toPrimitives())
    res.code(HttpStatus.OK)

    return users
  }

  @Get('/:userId')
  async show(@Req() req: Request, @Res() res: Response) {
    res.code(200)
    return {}
  }

  @Post('/')
  async create(
    @Req() req: Request<{ Body: { id: string; username: string; age: number; name: string } }>,
    @Res() res: Response
  ) {
    // const userCreator = new UserCreator(userRepository)
    req.body.id ??= new ObjectId().toString()
    res.code(HttpStatus.CREATED)

    await this.userCreator.run(req.body as any)

    return req.body
  }

  @Put('/:userId')
  async update(
    @Req()
    req: Request<{
      Body: { id?: string; username: string; age: number; name: string }
      Params: { userId: string }
    }>,
    @Res() res: Response
  ) {
    // const userUpdater = new UserUpdater(userRepository)
    const { userId } = req.params

    res.code(HttpStatus.OK)

    const user = (
      await this.userUpdater.run({
        id: userId,
        ...req.body
      })
    ).toPrimitives()

    return user
  }

  @Delete('/:userId')
  async delete(@Req() req: Request<{ Params: { userId: string } }>, @Res() res: Response) {
    const { userId } = req.params

    // const userDeleter = new UserDeleter(userRepository)

    res.code(HttpStatus.OK)

    const user = (await this.userDeleter.run(userId)).toPrimitives()

    return user
  }
}
