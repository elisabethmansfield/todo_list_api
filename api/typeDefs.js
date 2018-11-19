// TODO: Modularize the MongoDB/GraphQL database api

const typeDefs = `
  type ToDo {
    _id: ID!
    name: String!
    checked: Boolean
  }
  type Query {
    todo(_id: ID!): ToDo
    todos: [ToDo]
  }
  type Mutation {
    addToDo(name: String!, checked: Boolean): ToDo
    deleteToDo(_id: ID!): ToDo
    checkToDo(_id: ID!): ToDo
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = typeDefs;
