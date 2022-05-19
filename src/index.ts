import { addMessage, addUser, getMessages, getUsers } from './db'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import http from 'http'

import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import cors from 'cors'
import { typeDefs } from './schema'
import { resolvers } from './resolver'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/register', (req, res) => {
  if (typeof req.body.name !== 'string') {
    return res.status(400)
  }

  if (req.body.name[0] !== '@') {
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

app.post('/api/message', (req, res) => {
  if (typeof req.body.message !== 'string' || !req.body.user) {
    return res.status(400)
  }

  try {
    addMessage(req.body.user, req.body.message)
    return res.json({})
  } catch (e) {
    res.status(500).json({ msg: JSON.stringify(e) })
  }
})

const start = async () => {
  const httpServer = http.createServer(app)

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  )
  console.log('Running a GraphQL API server at http://localhost:4000/graphql')
}

start()
