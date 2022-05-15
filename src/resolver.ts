import { getUserById, getUsers, User } from './db'

export const resolvers = {
  Query: {
    users: () => getUsers(),
  },
}
