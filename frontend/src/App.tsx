import React from 'react'
import './App.css'
import { Users } from './components/Users'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { styled } from '@stitches/react'
import { Feed } from './components/Feed'
import axios from 'axios'

export const BASE_URL = `http://${window.location.hostname}:4000`
axios.defaults.baseURL = BASE_URL

const client = new ApolloClient({
  uri: `${BASE_URL}/graphql`,
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
        <Header>minitwitter! http://{window.location.hostname}:3000</Header>
        <Users />
        <Feed />
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
