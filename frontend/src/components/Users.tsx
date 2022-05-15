import { gql, useQuery } from '@apollo/client'
import { styled } from '@stitches/react'
import { RegisterUser } from './RegisterUser'
import { SendMessage } from './SendMessage'

const USERS_QUERY = gql`
  query Users {
    users {
      id
      name
      messages {
        id
        message
      }
    }
  }
`

type User = {
  id: number
  name: string
  messages: {
    id: number
    message: string
  }[]
}

type Data = {
  users: User[]
}

export const Users = () => {
  const { loading, error, data, refetch } = useQuery<Data>(USERS_QUERY)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return (
      <div>
        <div>Error loading:</div>
        <code>{JSON.stringify(error)}</code>
      </div>
    )
  }

  if (!data) {
    return <div>No data!</div>
  }

  return (
    <>
      <RegisterUser onCreated={() => refetch()} />
      <SendMessage onSendMessage={() => refetch()} />
      <UsersDisplay users={data.users} />
    </>
  )
}

const UsersDisplay = ({ users }: { users: User[] }) => {
  return (
    <UsersContainer>
      {users.map((user) => (
        <UserContainer key={user.id}>
          <UserName>{user.name}</UserName>
          <MessagesContainer>
            {user.messages.map((message) => (
              <MessageDisplay key={message.id}>
                {message.message}
              </MessageDisplay>
            ))}
          </MessagesContainer>
        </UserContainer>
      ))}
    </UsersContainer>
  )
}

const UsersContainer = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: 16,
})
const UserContainer = styled('div', {
  borderRadius: 8,
  minWidth: 200,
  minHeight: 200,
  margin: 12,
  padding: '8px 12px',
  border: '1px solid #343434',
})

const UserName = styled('div', {
  padding: '8px 0',
  fontWeight: 'bold',
  fontSize: '23px',
  textAlign: 'center',
})

const MessagesContainer = styled('div', {
  padding: 8,
})
const MessageDisplay = styled('div', {
  fontSize: 16,
  background: '#dfdfdf',
  padding: '4px 8px',
  margin: '8px 0',
  borderRadius: 4,
})
