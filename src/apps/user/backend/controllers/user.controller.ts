import { FastifyInstance, HookHandlerDoneFunction } from 'fastify'
import HttpStatus from 'http-status'

import { MongoDB } from '@/Contexts/Shared/infrastructure/persistance/mongo/mongodb'
import { MongoUserRepository, UserCreator, UserDeleter, UserGetter, UserUpdater } from '@/Contexts/User'

let userRepository!: MongoUserRepository

// eslint-disable-next-line max-lines-per-function
export const UserController = (fastify: FastifyInstance, opts: unknown, done: HookHandlerDoneFunction) => {
  fastify
    .addHook('preHandler', async () => {
      const database = await MongoDB.getInstance()
      userRepository = new MongoUserRepository(database)
    })
    .get('/users', async (req: Request, res: Response) => {
      const userGetter = new UserGetter(userRepository)
      const users = await userGetter.run()
      res.code(HttpStatus.OK)

      return users
    })
    .get('/users/:user', async (req: Request, res: Response) => {
      res.code(200)
      return {}
    })
    .post('/users', async (req: Request<{ Body: { username: string; age: number; name: string } }>, res: Response) => {
      const userCreator = new UserCreator(userRepository)

      const { username, age, name } = req.body
      const user = {
        username,
        age,
        name
      }

      res.code(HttpStatus.CREATED)

      return await userCreator.run(user)
    })
    .put(
      '/users/:user',
      async (
        req: Request<{
          Body: { username: string; age: number; name: string }
          Params: { user: string }
        }>,
        res: Response
      ) => {
        const { username, age, name } = req.body

        const userUpdater = new UserUpdater(userRepository)

        const userId = req.params.user
        const user = {
          id: userId,
          username,
          age,
          name
        }

        res.code(HttpStatus.OK)

        return await userUpdater.run(user)
      }
    )
    .delete('/users/:user', async (req: Request<{ Params: { user: string } }>, res: Response) => {
      const userId = req.params.user

      const userDeleter = new UserDeleter(userRepository)

      res.code(HttpStatus.OK)

      return await userDeleter.run(userId)
    })
  done()
}
