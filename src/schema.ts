import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    users: [User]!
    messages: [Message]!
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
`
