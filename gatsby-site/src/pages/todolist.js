import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import ToDoList from '../containers/ToDoList';
import { url } from '../../../server/app';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

const BASE_URL = url + '/api';

const httpLink = new HttpLink({
  uri: BASE_URL,
  headers: {},
  fetch: fetch
});
const cache = new InMemoryCache();
const client = new ApolloClient({
  link: httpLink,
  cache,
});

const ToDoListPage = () => (
  <ApolloProvider client={client}>
    <Layout>
      <ToDoList client={client}/>
    </Layout>
  </ApolloProvider>
);

export default ToDoListPage;
