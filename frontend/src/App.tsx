import React from 'react';
import './App.css';
import { Todos } from './components/Todos';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Todos />
      </div>
    </ApolloProvider>
  );
}

export default App;
