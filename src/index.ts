import { addUser, getMessages, getUsers } from './db'
import express from 'express'

import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import cors from 'cors'
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    users: [User]!
  }

  type User {
    id: ID!
    name: String!
    messages: [Message]
  }

  type Message {
    id: ID!
    message: String!
    user: User!
  }
`)

// The root provides a resolver function for each API endpoint
const root = {
  users: () => {
    return getUsers()
  },
}

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/register', (req, res) => {
  if (typeof req.body.name !== 'string') {
    return res.status(400)
  }

  try {
    const userEntity = addUser({
      name: req.body.name as string,
    })

    return res.json({ user: userEntity })
  } catch (e) {
    res.status(500).json({ msg: JSON.stringify(e) })
  }
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)
app.listen(4000)
console.log('Running a GraphQL API server at http://localhost:4000/graphql')
