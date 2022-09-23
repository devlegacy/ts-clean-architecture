import { FastifyInstance, HookHandlerDoneFunction } from 'fastify'
import HttpStatus from 'http-status'

import { MongoDB } from '@/Contexts/Shared/infrastructure/persistance/mongo/MongoDB'
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
      const users = (await userGetter.run()).map((user) => user.toPrimitives())
      res.code(HttpStatus.OK)

      return users
    })
    .get('/users/:userId', async (req: Request, res: Response) => {
      res.code(200)
      return {}
    })
    .post('/users', async (req: Request<{ Body: { username: string; age: number; name: string } }>, res: Response) => {
      const userCreator = new UserCreator(userRepository)

      res.code(HttpStatus.CREATED)

      const user = (await userCreator.run(req.body)).toPrimitives()

      return user
    })
    .put(
      '/users/:userId',
      async (
        req: Request<{
          Body: { username: string; age: number; name: string }
          Params: { userId: string }
        }>,
        res: Response
      ) => {
        const userUpdater = new UserUpdater(userRepository)
        const { userId } = req.params
        res.code(HttpStatus.OK)
        const user = (
          await userUpdater.run({
            id: userId,
            ...req.body
          })
        ).toPrimitives()

        return user
      }
    )
    .delete('/users/:userId', async (req: Request<{ Params: { userId: string } }>, res: Response) => {
      const { userId } = req.params

      const userDeleter = new UserDeleter(userRepository)

      res.code(HttpStatus.OK)

      return await userDeleter.run(userId)
    })
  done()
}
