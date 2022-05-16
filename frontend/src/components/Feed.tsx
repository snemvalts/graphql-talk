import { gql, useQuery } from '@apollo/client'
import { styled } from '@stitches/react'
import { useEffect } from 'react'

const MESSAGES_QUERY = gql`
  query Messages {
    messages {
      id
      message
      user {
        id
        name
      }
    }
  }
`

type Message = {
  id: number
  message: string
  user: {
    id: number
    name: string
  }
}

type Data = {
  messages: Message[]
}

export const Feed = () => {
  const { loading, error, data, startPolling } = useQuery<Data>(MESSAGES_QUERY)

  useEffect(() => {
    startPolling(1000)
  }, [startPolling])

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

  const messages = data?.messages ?? []
  return (
    <>
      <h2>The best algorithmic feed yet!</h2>
      {[...messages].reverse().map((message) => (
        <Message key={message.id}>
          <b>{message.user.name}: </b>
          {message.message}
        </Message>
      ))}
    </>
  )
}

const Message = styled('div', {
  fontSize: 20,
})
