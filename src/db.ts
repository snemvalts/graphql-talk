import crypto from 'crypto'

type User = {
  id: number
  name: string
  secret: string
  messages: Message['id'][]
}
type Message = {
  id: number
  message: string
  userId: User['id']
}

const users: User[] = []
const messages: Message[] = []

export const getUsers = () =>
  users.map((user) => {
    const { secret, ...userWithoutSecret } = user
    return userWithoutSecret
  })

export const getMessages = () => messages

export const addUser = (
  userProps: Omit<User, 'id' | 'secret' | 'messages'>
) => {
  const id =
    users.length === 0 ? 0 : Math.max(...users.map((user) => user.id)) + 1
  const secret = crypto.randomBytes(256).toString('hex')

  const user: User = {
    id,
    secret,
    messages: [],
    ...userProps,
  }

  users.push(user)

  return user
}

export const addMessage = (userProps: User, message: string) => {
  const id =
    messages.length === 0
      ? 0
      : Math.max(...messages.map((message) => message.id)) + 1

  const user = users.find((user) => userProps.id === user.id)

  if (!user) {
    throw new Error('No user!')
  }

  if (user?.secret !== userProps.secret) {
    throw new Error('Secret incorrect!')
  }

  messages.push({
    id,
    message,
    userId: user.id,
  })

  return message
}
