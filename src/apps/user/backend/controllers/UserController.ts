import HttpStatus from 'http-status'

import { Controller, Delete, Get, Post, Put, Req, Res } from '@/Contexts/Shared/domain/Common'
import { Request, Response } from '@/Contexts/Shared/infrastructure/Fastify'
import { UserId } from '@/Contexts/User/Shared/domain'
import { UserCreator, UserDeleter, UserGetter, UserUpdater } from '@/Contexts/User/Users/application'
import { UserFinder } from '@/Contexts/User/Users/domain'

@Controller('users')
export class UserController {
  constructor(
    private readonly userGetter: UserGetter,
    private readonly userCreator: UserCreator,
    private readonly userUpdater: UserUpdater,
    private readonly userDeleter: UserDeleter,
    private readonly userFinder: UserFinder
  ) {}

  @Get()
  async index() {
    // const userGetter = new UserGetter(userRepository)
    const users = await this.userGetter.run()
    // res.code(HttpStatus.OK)

    return users.map((user) => user.toPrimitives())
  }

  @Get('/:userId')
  async show(@Req() req: Request<{ Params: { userId: string } }>) {
    const { userId } = req.params
    const user = await this.userFinder.run(userId)
    // res.code(200)
    return user.toPrimitives()
  }

  @Post()
  async create(
    @Req() req: Request<{ Body: { id: string; username: string; age: number; name: string } }>
    // @Res() res: Response
  ) {
    // const userCreator = new UserCreator(userRepository)
    req.body.id ??= UserId.random().toString()
    // res.code(HttpStatus.CREATED)

    await this.userCreator.run(req.body as any)

    return req.body
  }

  @Put(':userId')
  async update(
    @Req()
    req: Request<{
      Body: { id?: string; username: string; age: number; name: string }
      Params: { userId: string }
    }>
  ) {
    // const userUpdater = new UserUpdater(userRepository)
    const { userId } = req.params

    // res.code(HttpStatus.OK)

    const user = (
      await this.userUpdater.run({
        id: userId,
        ...req.body,
      } as any)
    ).toPrimitives()

    return user
  }

  @Delete(':userId')
  async delete(@Req() req: Request<{ Params: { userId: string } }>, @Res() res: Response) {
    const { userId } = req.params

    // const userDeleter = new UserDeleter(userRepository)

    res.code(HttpStatus.OK)

    const user = (await this.userDeleter.run(userId)).toPrimitives()

    return user
  }
}
