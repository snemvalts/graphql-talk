import { styled } from '@stitches/react'
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
    if (!name?.length || (name.length > 0 && name[0] !== '@')) {
      setName('@')
    }
  }, [name])

  const registerUser = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/register', {
        name,
      })
      window.localStorage.setItem('user', JSON.stringify(res.data.user))
      setCreated(true)
      onCreated()
    } catch (e) {
      alert(JSON.stringify(e))
    }
  }

  const signOutForGood = () => {
    if (window.confirm('Still want to do it?')) {
      window.localStorage.removeItem('user')
      setCreated(false)
    }
  }

  if (created) {
    const user = JSON.parse(window.localStorage.getItem('user')!)
    return (
      <UserContainer>
        You are: <b>{user.name}</b>
        <Button onClick={signOutForGood}>Sign out for good...</Button>
      </UserContainer>
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

const UserContainer = styled('div', {
  fontSize: 24,
})
