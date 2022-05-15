import React from 'react'
import './App.css'
import { Users } from './components/Users'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { styled } from '@stitches/react'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
})

function App() {
  return (
    <ApolloProvider client={client}>
      <MainContainer className="App">
        <Header>minitwitter!</Header>
        <Users />
      </MainContainer>
    </ApolloProvider>
  )
}

const MainContainer = styled('div', {
  margin: '0 auto',
  maxWidth: '50%',
})

const Header = styled('h1', {})
export default App
