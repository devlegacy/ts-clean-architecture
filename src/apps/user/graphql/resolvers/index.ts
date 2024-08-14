import {
  userMutation,
  userQueries,
} from './users/index.js'

const resolvers = {
  Query: {
    ...userQueries,
  },
  Mutation: {
    ...userMutation,
  },
}

export default resolvers
