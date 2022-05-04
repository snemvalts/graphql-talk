import { gql, useQuery } from '@apollo/client';

const HELLO_QUERY = gql`
  query Hello {
    hello
  }
`;

export const Todos = () => {
  const { loading, error, data } = useQuery(HELLO_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <div>Error loading:</div>
        <code>{JSON.stringify(error)}</code>
      </div>
    );
  }

  return <div>Response: {JSON.stringify(data)}</div>;
};
