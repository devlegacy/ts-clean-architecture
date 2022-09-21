import { FastifyInstance, HookHandlerDoneFunction } from 'fastify'
import HttpStatus from 'http-status'

import { MongoDB } from '@/contexts/shared/infrastructure/persistance/mongo/mongodb'
import { MongoDBUserRepository, UserCreator, UserDeleter, UserGetter, UserUpdater } from '@/contexts/user'

let mongoDbUserRepository!: MongoDBUserRepository

// eslint-disable-next-line max-lines-per-function
export const UserController = (fastify: FastifyInstance, opts: unknown, done: HookHandlerDoneFunction) => {
  fastify
    .addHook('preHandler', async () => {
      const database = await MongoDB.getInstance()
      mongoDbUserRepository = new MongoDBUserRepository(database)
    })
    .get('/users', async (req: Request, res: Response) => {
      const userGetter = new UserGetter(mongoDbUserRepository)
      const users = await userGetter.run()
      res.code(HttpStatus.OK)

      return users
    })
    .get('/users/:user', async (req: Request, res: Response) => {
      res.code(200)
      return {}
    })
    .post('/users', async (req: Request<{ Body: { username: string; age: number; name: string } }>, res: Response) => {
      const userCreator = new UserCreator(mongoDbUserRepository)

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

        const userUpdater = new UserUpdater(mongoDbUserRepository)

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

      const userDeleter = new UserDeleter(mongoDbUserRepository)

      res.code(HttpStatus.OK)

      return await userDeleter.run(userId)
    })
  done()
}
