import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
} from '#@/src/Contexts/Shared/domain/Common/index.js'
import type {
  Request,
} from '#@/src/Contexts/Shared/infrastructure/Fastify/index.js'
import {
  UserId,
} from '#@/src/Contexts/User/Shared/domain/index.js'
import {
  UserCreator,
  UserDeleter,
  UserSearcherAll,
  UserUpdater,
} from '#@/src/Contexts/User/Users/application/index.js'
import {
  UserFinder,
} from '#@/src/Contexts/User/Users/domain/index.js'

@Controller('users')
export class UserController {
  constructor(
    private readonly userSearcher: UserSearcherAll,
    private readonly userCreator: UserCreator,
    private readonly userUpdater: UserUpdater,
    private readonly userDeleter: UserDeleter,
    private readonly userFinder: UserFinder,
  ) {}

  @Get()
  async index() {
    // const userGetter = new UserGetter(userRepository)
    const users = await this.userSearcher.run()
    // res.code(HttpStatus.OK)

    return users.map((user) => ({
      ...user.toPrimitives(),
      age: user.age(),
    }))
  }

  @Get(':id')
  async show(@Req() req: Request<{ Params: { id: string } }>) {
    const {
      id,
    } = req.params
    const user = await this.userFinder.run(id)
    // res.code(200)
    return {
      ...user.toPrimitives(),
      age: user.age(),
    }
  }

  @Post()
  async create(
    @Req()
    req: Request<{
      Body: {
        id: string
        username: string
        // age: number
        name: string
        email: string
        birthdate: Date
        jobExperiences: any[]
      }
    }>,
    // @Res() res: Response
  ) {
    const user = req.body
    user.id ??= UserId.random().toString()
    user.birthdate = new Date(user.birthdate)
    // const userCreator = new UserCreator(userRepository)
    // res.code(HttpStatus.CREATED)

    await this.userCreator.run(user)

    return user
  }

  @Put(':id')
  async update(
    @Req()
    req: Request<{
      Body: { id?: string, username: string, age: number, name: string }
      Params: { id: string }
    }>,
  ) {
    // const userUpdater = new UserUpdater(userRepository)
    const {
      id,
    } = req.params

    // res.code(HttpStatus.OK)

    const user = {
      id,
      ...req.body,
    }
    await this.userUpdater.run(user)

    return user
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(@Req() req: Request<{ Params: { id: string } }>) {
    const {
      id,
    } = req.params

    // const userDeleter = new UserDeleter(userRepository)

    // res.code(HttpStatus.OK)

    const user = (await this.userDeleter.run(id)).toPrimitives()

    return user
  }
}
