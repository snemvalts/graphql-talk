import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import { Button, Input, InputsContainer } from './SendMessage'

type Props = {
  onCreated: () => void
}

export const RegisterUser = ({ onCreated }: Props) => {
  const [name, setName] = useState('@')
  const [created, setCreated] = useState(!!window.localStorage.getItem('user'))

  useEffect(() => {
    if (!name) {
      setName('@')
    }
  }, [name])

  const registerUser = async (e: FormEvent) => {
    e.preventDefault()
    const res = await axios.post('http://localhost:4000/api/register', { name })
    window.localStorage.setItem('user', JSON.stringify(res.data.user))
    setCreated(true)
    onCreated()
  }

  if (created) {
    const user = JSON.parse(window.localStorage.getItem('user')!)
    return (
      <div>
        You are:{' '}
        <b>
          {user.name}, ID: {user.id}
        </b>
      </div>
    )
  }
  return (
    <InputsContainer onSubmit={registerUser}>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit">Register</Button>
    </InputsContainer>
  )
}
