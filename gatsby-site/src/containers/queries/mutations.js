import gql from 'graphql-tag';

const ADD_TODO = gql`
  mutation a($name: String!, $checked: Boolean){
    addToDo (name: $name, checked: $checked){
      _id
      name
      checked
    }
  }
`;

const DELETE_TODO = gql`
  mutation d($_id: ID!){
    deleteToDo (_id: $_id){
      _id
    }
  }
`;

const CHECK_TODO = gql`
  mutation c($_id: ID!){
    checkToDo (_id: $_id){
      _id
    }
  }
`;

const UNCHECK_TODO = gql`
  mutation u($_id: ID!){
    uncheckToDo (_id: $_id){
      _id
    }
  }
`;

export { 
  ADD_TODO,
  DELETE_TODO,
  CHECK_TODO,
  UNCHECK_TODO,
};

