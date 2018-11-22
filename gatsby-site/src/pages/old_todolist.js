import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import ToDoList from '../containers/ToDoList';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

class APIWrapper extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      client: {}
    };
    if (typeof window !== `undefined`) {
      const BASE_URL = window.location.origin.toString() + "/api/";
      console.log(
        'my BASE_URL: ',BASE_URL,
        //   '\nhash: ',location.hash,
        //   '\nhost: ',location.host,	
        //   '\nhostname: ',location.hostname,	
        //   '\nhref: ',location.href,	
        //   '\norigin: ',location.origin,	
        //   '\npathname: ',location.pathname,	
        //   '\nport: ',location.port,	
        //   '\nprotocol: ',location.protocol,	
        //   '\nsearch: ',location.search,	
      );
      }
    }

  // componentDidMount(){
  //   /* API configuration */
  //   const BASE_URL = window.location.origin.toString() + "/api/";
  //   console.log(
  //     'my BASE_URL: ',BASE_URL,
  //     //   '\nhash: ',location.hash,
  //     //   '\nhost: ',location.host,	
  //     //   '\nhostname: ',location.hostname,	
  //     //   '\nhref: ',location.href,	
  //     //   '\norigin: ',location.origin,	
  //     //   '\npathname: ',location.pathname,	
  //     //   '\nport: ',location.port,	
  //     //   '\nprotocol: ',location.protocol,	
  //     //   '\nsearch: ',location.search,	
  //   );
  //   /* Apollo configuration */
  //   const httpLink = new HttpLink({
  //     uri: BASE_URL,
  //     headers: {},
  //     fetch: fetch
  //   });
  //   const cache = new InMemoryCache();
  //   const client = new ApolloClient({
  //     link: httpLink,
  //     cache,
  //   });
  //   this.setState({client:client.bind(this)});
  // }
    //   return (
    //   <ApolloProvider client={this.state.client}>
    //     <Layout>
    //       <ToDoList client={this.state.client}/>
    //     </Layout>
    //   </ApolloProvider>
    // );
  render(){
    return (
        <Layout>
          <ToDoList />
        </Layout>
    );
  }
}

const ToDoListPage = () => (
  <APIWrapper />
);

export default ToDoListPage;