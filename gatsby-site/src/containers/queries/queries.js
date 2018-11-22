import gql from 'graphql-tag';

const GET_TODO = gql`
  query {
    todo (_id: ID){
      _id
      name
      checked
    }
  }
`;

const GET_TODOS = gql`
  query {
    todos {
      _id
      name
      checked
    }
  }
`;

export {
  GET_TODO,
  GET_TODOS,
};