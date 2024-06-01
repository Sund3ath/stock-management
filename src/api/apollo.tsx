import { ApolloClient, InMemoryCache  } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://localhost:3000/api',//link to our fake server
    cache: new InMemoryCache(),
  });

export default client