import gql from 'graphql-tag';

export const GET_TODOS = gql`
    query {
      todos {
        _id
        name
        checked
      }
    }
`;

