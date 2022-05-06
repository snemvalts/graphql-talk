import axios from 'axios'
import { useState } from 'react'

export const RegisterUser = () => {
  const [name, setName] = useState('')
  const [created, setCreated] = useState(!!window.localStorage.getItem('user'))

  const registerUser = async () => {
    const res = await axios.post('http://localhost:4000/api/register', { name })
    window.localStorage.setItem('user', JSON.stringify(res.data.user))
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
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={registerUser}>Register</button>
    </div>
  )
}
