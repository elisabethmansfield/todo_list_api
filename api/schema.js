// TODO: modularize the MongoDB/GraphQL database api

const graphql_tools = require('graphql-tools');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

module.exports = graphql_tools.makeExecutableSchema({
  typeDefs,
  resolvers
});