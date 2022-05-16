import { styled } from '@stitches/react'
import axios from 'axios'
import { FormEvent, useState } from 'react'

type Props = {
  onSendMessage: () => void
}

export const SendMessage = ({ onSendMessage }: Props) => {
  const user = JSON.parse(window.localStorage.getItem('user')!)

  const [message, setMessage] = useState('')
  const [created, setCreated] = useState(!!user)

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/message', {
        user,
        message,
      })

      setMessage('')
      onSendMessage()
    } catch (e) {
      alert(JSON.stringify(e))
    }
  }

  if (!user) {
    return null
  }

  return (
    <InputsContainer onSubmit={sendMessage}>
      <Input
        type="text"
        placeholder="your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button>Send message!</Button>
    </InputsContainer>
  )
}

export const InputsContainer = styled('form', {
  padding: '8px 16px 8px 0',
})

export const Input = styled('input', {
  fontSize: 24,
  padding: '8px 16px',
  borderRadius: 6,
  boxShadow: 0,
  fontFamily: 'Inter',
  border: '2px solid #4f4f4f',
})

export const Button = styled('button', {
  fontSize: 24,
  color: 'black',
  padding: '8px 16px',
  borderRadius: 6,
  boxShadow: 0,
  border: 0,
  background: '#d4d4d4',
  fontFamily: 'Inter',
  cursor: 'pointer',
  marginLeft: 8,
})
