import React from 'react';
import Layout from '../components/Layout';
import ToDoList from '../containers/ToDoList';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

let ToDoListPage = () => (
    <Layout>
      <ToDoList />
    </Layout>
);

/* Local API configuration */
if (typeof window !== `undefined`) {
  const BASE_URL = window.location.origin.toString() + "/api/";
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  const httpLink = new HttpLink({
    uri: BASE_URL,
    headers: {},
    fetch: fetch
  });
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    link: ApolloLink.from([errorLink,httpLink]),
    cache,
  });
  ToDoListPage = () => (
    <ApolloProvider client={client}>
      <Layout>
        <ToDoList client={client} />
      </Layout>
    </ApolloProvider>
  );
}

export default ToDoListPage;
