const express = require("express");
//const couchbase = require("couchbase");
// const expressGraphQL = require("express-graphql");
// const buildSchema = require("graphql").buildSchema;
// const graphql = require('graphql').graphql;
const graphqlHTTP = require('express-graphql');
// const graphql_tools = require('graphql-tools');
// const ObjectId = require('mongodb').ObjectId;
// const bodyParser = require('body-parser');
// const graphqlexpress = require ('graphql-server-express');
const UUID = require("uuid");
const app = express();
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
app.use(express.static(path.join(__dirname, '../gatsby-site/public')));
// express.static(root, [options])
// app.use(express.static('public'));
// Use localhost and port 3000 if Host and Port not provided.
const port = parseInt(argv.port || process.env.PORT || '3000', 10);
const host = argv.host || process.env.HOST || process.env.IP || "0.0.0.0"; 
const graphql_tools = require('graphql-tools');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const MONGO_URL = 'mongodb://owner:dev161653@ds161653.mlab.com:61653/todo_list_api_db';
const createCollections = require('../api/database');
const APItypeDefs = require('../api/typeDefs');
const APIresolvers = require('../api/resolvers');

/*
database().then( (result) => { 
  const schema = result; 
  console.log('schema: ',schema);
  app.use('/api', graphqlHTTP({
    graphiql: true,
    schema,
    context: {}
  }));  
});
//const prodMiddleware = require('./middleware/prodMiddleware');
//const devMiddleware = require('./middleware/devMiddleware');
// Middleware: set mode to development or production.
//const mode = process.env.NODE_ENV;
//if (mode === 'production') {
  const options = {
    outputPath: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  };
/*  prodMiddleware(app, options);
} 
else {
  const webpack = require('../internals/webpack/webpack.dev.babel');
  devMiddleware(app, webpack);
}
*/
/*
let schema = buildSchema(`
    type Account {
        id: String,
        firstname: String,
        lastname: String,
    }
    type Blog {
        id: String,
        account: String!,
        title: String,
        content: String
    }
`);


app.use("/api", expressGraphQL({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));
*/

// internal test
// var query = 'query { todos { _id, name, checked } }';
// graphql(schema, query).then( function(result) {  
//   console.log(JSON.stringify(result,null," "));
// });

// app.use('/api', bodyParser.json(), graphqlexpress.graphqlExpress({schema}));

// app.use('/graphql', graphqlexpress.graphiqlExpress({
//   endpointURL: '/api'
// }));

// app.use('/graphiql', graphqlexpress.graphiqlExpress({
//   endpointURL: '/api'
// }));

// db.close();
/*
app.get('/', (req, res) =>
    // res.sendFile(__dirname + '/index.html')
    res.sendFile(__dirname + '/index.html')
    // res.sendFile('index.html', { root: __dirname })
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
*/
const convertString = (obj) => {
  obj._id = obj._id.toString();
  return obj;
};

const start = async () => {
  try {
    // const ToDos = await MongoClient.connect(MONGO_URL,{ useNewUrlParser: true }, function(err, db) {
    //   if(err) throw err;
    //   const database = db.db('todo_list_api_db');
    //   createCollections(database);
    //   return database.collection('todos');
    // });
    const db1 = await MongoClient.connect(MONGO_URL,{ useNewUrlParser: true });
    const db2 = db1.db('todo_list_api_db');
    
    // create collection
    // const ToDo = db2.colllection('todo');
    const ToDos = db2.collection('todos');
    // console.log('ToDos: ',ToDos);
        // console.log('db: ',db);
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

    const schema = graphql_tools.makeExecutableSchema({
      typeDefs,
      resolvers
    });

  app.use('/api', graphqlHTTP({
    graphiql: true,
    schema,
    context: {}
  })); 
  
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

start();