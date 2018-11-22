// Start the application

/* Server Dependencies */
const express = require("express");
const app = express();
// const bodyParser = require('body-parser');
const request = require('request');
const UUID = require("uuid");
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
// Use localhost and port 3000 if Host and Port not provided.
const port = parseInt(argv.port || process.env.PORT || '3000', 10);
const host = argv.host || process.env.HOST || process.env.IP || "0.0.0.0"; 
const url = "http://" + host + ":" + port;
// const port = '3000';
// const host = "0.0.0.0"; 
app.use(express.static(path.join(__dirname, '../gatsby-site/public')));

/* Database Dependencies */
const graphqlHTTP = require('express-graphql');
const graphql_tools = require('graphql-tools');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const MONGO_URL = 'mongodb://owner:dev161653@ds161653.mlab.com:61653/todo_list_api_db';
const convertString = require('../utils/index');

const startServer = async () => {
  try {
    const db = await MongoClient.connect(MONGO_URL,{ useNewUrlParser: true });
    const database = db.db('todo_list_api_db');
    const ToDos = database.collection('todos');

    // define typeDefs for GraphQL schema
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
        uncheckToDo(_id: ID!): ToDo
      }
      schema {
        query: Query
        mutation: Mutation
      }
    `;

    // define resolvers for GraphQL schema
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
        deleteToDo: async (root, {_id}, context, info) => {
          const todo = await ToDos.findOne(ObjectId(_id));
          await ToDos.deleteOne(todo);
        },
        checkToDo: async (root, {_id}, context, info) => {
          const todo = await ToDos.findOne(ObjectId(_id));
          let checked = { $set: {checked: true} };
          await ToDos.updateOne(todo,checked);
        },
        uncheckToDo: async (root, {_id}, context, info) => {
          const todo = await ToDos.findOne(ObjectId(_id));
          let checked = { $set: {checked: false} };
          await ToDos.updateOne(todo,checked);
        },        
      },      
    };

    // define GraphQL schema
    const schema = graphql_tools.makeExecutableSchema({
      typeDefs,
      resolvers
    });

    // GraphQL API route
    app.use('/api', graphqlHTTP({
        graphiql: true,
        schema,
        context: {}
      }), 
      function(req,res){
        graphqlHTTP.parseBody(req, function (err, data) {
          if(err) throw err;
          request({
            url: 'http://' + host + ":" + port, 
            method: 'POST',
            headers: {
              'Content-Type': 'application/graphql'
            },
            body: data.query 
          }, 
          function(err, resp, body){
            if(err) throw err;
            res.send(JSON.parse(body));
          });
        });
    });
    
    // Root route
    app.get('/', (req, res) =>
        res.sendFile(__dirname + '/index.html')
    );
  
    // Bind and listen for connections on the specified host and port.
    app.listen(port, host, err => {
      if (err) {
        console.error(err.message);
      }
      console.log("Server started!");
      console.log("Localhost: http://" + host + ":" + port);
      console.log("Press 'CTRL-C' to stop");
    });

  } 
  catch (e) {
    throw e;
  }

};

startServer();

module.exports = url;