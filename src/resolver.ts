import {
  getMessages,
  getMessagesForUser,
  getUserById,
  getUsers,
  Message,
  User,
} from './db'

export const resolvers = {
  Query: {
    users: () => getUsers(),
    messages: () => getMessages(),
  },
  Message: {
    user: (parent: Message) => {
      const userId = parent.userId
      return getUserById(userId)
    },
  },
}
