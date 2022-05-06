import { gql, useQuery } from '@apollo/client'
import { RegisterUser } from './RegisterUser'

const USERS_QUERY = gql`
  query Users {
    users {
      id
      name
      messages {
        id
      }
    }
  }
`

export const Users = () => {
  const { loading, error, data } = useQuery(USERS_QUERY)

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

  return (
    <div>
      <RegisterUser />
      Response: {JSON.stringify(data)}
    </div>
  )
}
