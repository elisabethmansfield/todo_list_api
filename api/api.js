const graphql_tools = require('graphql-tools');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const MONGO_URL = 'mongodb://owner:dev161653@ds161653.mlab.com:61653/todo_list_api_db';

const convertString = (obj) => {
  obj._id = obj._id.toString();
  return obj;
};

const schema = MongoClient.connect(MONGO_URL,{ useNewUrlParser: true }).then( res => {
    const db = res.db('todo_list_api_db');
    const ToDos = db.collection('todos');
    
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
    
    const resolvers = {
      Query: {
        todo: async (root,{_id}) => {
          return convertString(await ToDos.findOne(ObjectId(_id)));
        },
        todos: async () => {
          return (await ToDos.find({}).toArray()).map(convertString);
        }
      },
      Mutation: {
        addToDo: async (root, args, context, info) => {
          const res = await ToDos.insertOne(args);
          return convertString(res.ops[0]);
        },
        deleteToDo: async (root, args, context, info) => {
          const res = await ToDos.deleteOne(args);
          return convertString(res.ops[0]);
        },
        checkToDo: async (root, args, context, info) => {
          const status = await ToDos.findOne(args).checked;
          let checked = {checked: false};
          if(status) checked.checked = true;
          const res = await ToDos.updateOne(args,checked);
          return convertString(res.ops[0]);
        },
      },
    };
    
    return graphql_tools.makeExecutableSchema({
      typeDefs,
      resolvers
    });
 
});

module.exports = schema;