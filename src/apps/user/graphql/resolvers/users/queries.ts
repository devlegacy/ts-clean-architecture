import { container } from '@/apps/user/modules/index.js'
import { UserSearcherAll } from '@/Contexts/User/Users/application/index.js'

const userQueries = {
  user: async (_: any, _args: any) => {
    const searcher = container.get(UserSearcherAll)
    const users = await searcher.run()

    return users.map((user) => user.toPrimitives())
  },
}

export default userQueries
