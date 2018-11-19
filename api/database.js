// const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const MONGO_URL = 'mongodb://owner:dev161653@ds161653.mlab.com:61653/todo_list_api_db';
// const mongoose = require('mongoose');
const graphql_tools = require('graphql-tools');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const convertString = (obj) => {
  obj._id = obj._id.toString();
  return obj;
};

// const database = async (func) => {
//      let db = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, function(err, db) {
//           if (err) throw err;
//           else console.log('Database connected/created!');
//           return db.db("todo_list_api_db");
//     });
//   func();
//   db.close();
// };

const createCollections = (db) => {
  // create collection
  db.createCollection("todo", function(err, res) {
    if (err) throw err;
    else console.log("todo Collection created!");
  });
  // create collection
  db.createCollection("todos", function(err, res) {
    if (err) throw err;
    else console.log("todos Collection created!");
  });

      // insert one document
      let myobj = { name: "Company Inc", checked: false };
      db.collection("todo").insertOne(myobj, function(err, res) {
        if (err) throw err;
        else console.log("Document inserted!");
      });
};

// const buildSchema = async() => {
//     await graphql_tools.makeExecutableSchema({
//       typeDefs,
//       resolvers
//     });
// };
        
// // TEST
// const database2 = async () => { 
//   // create & connect database
//   const db = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, function(err, db) {
//       if (err) throw err;
//       else console.log('Database created!');
//       const dbo = db.db("todo_list_api_db");
//       const ToDo = dbo.collection('todo');

//       // create collection
//       dbo.createCollection("todo", function(err, res) {
//         if (err) throw err;
//         else console.log("Collection created!");
//       });
      
//       // insert one document
//       let myobj = { name: "Company Inc", checked: false };
//       dbo.collection("todo").insertOne(myobj, function(err, res) {
//         if (err) throw err;
//         else console.log("Document inserted!");
//       });
      
//       // insert many documents
//       myobj = [
//         { name: 'John', checked: false},
//         { name: 'Peter', checked: false},
//         { name: 'Amy', checked: false},
//         { name: 'Hannah', checked: false},
//         { name: 'Michael', checked: false},
//         { name: 'Sandy', checked: false},
//         { name: 'Betty', checked: false},
//         { name: 'Richard', checked: false},
//         { name: 'Susan', checked: false},
//         { name: 'Vicky', checked: false},
//         { name: 'Ben', checked: false},
//         { name: 'William', checked: false},
//         { name: 'Chuck', checked: false},
//         { name: 'Viola', checked: false}
//       ];
//       dbo.collection("todo").insertMany(myobj, function(err, res) {
//         if (err) throw err;
//         else console.log("Number of documents inserted: " + res.insertedCount);
//       });
      
//       // find first document
//       dbo.collection("todo").findOne({}, function(err, result) {
//         if (err) throw err;
//         else console.log(result.name);
//       });
      
//       // find all documents
//       // dbo.collection("todo").find({}).toArray(function(err, result) {
//       //   if (err) throw err;
//       //   else console.log(result);
//       // });
      
//       // find specific document
//       // let query = { checked: false };
//       // dbo.collection("todo").find(query).toArray(function(err, result) {
//       //   if (err) throw err;
//       //   else console.log("Query result: ",result);
//       // });
      
//       // delete specific document
//       let myquery = { name: 'Vicky' };
//       dbo.collection("todo").deleteOne(myquery, function(err, obj) {
//         if (err) throw err;
//         else console.log("Document deleted!");
//       });
      
//       // delete many documents
//       myquery = { name: /^B/ };
//       dbo.collection("todo").deleteMany(myquery, function(err, obj) {
//         if (err) throw err;
//         else console.log(obj.result.n + " document(s) deleted");
//       });
      
//       // update one document
//       myquery = { name: 'Amy' };
//       let newvalues = { $set: {name: "Mickey", checked: true } };
//       dbo.collection("todo").updateOne(myquery, newvalues, function(err, res) {
//         if (err) throw err;
//         else console.log("1 document updated");
//       });
      
//       // update many documents
//       myquery = { name: /^S/ };
//       newvalues = {$set: {name: "Minnie"} };
//       dbo.collection("todo").updateMany(myquery, newvalues, function(err, res) {
//         if (err) throw err;
//         else console.log(res.result.nModified + " document(s) updated");
//       });
      
//       // drop collection
//       dbo.collection("todo").drop(function(err, delOK) {
//         if (err) throw err;
//         if (delOK) console.log("Collection deleted!");
//       });
      
//       // db.close();
//   });

//     // mongoose.connect("mongodb://localhost/cats");
//     // (async () => {
//     //     try {
//     //       const db = await mongo.connect(MONGO_URL,{ useNewUrlParser: true })
//     //       .then(console.log('Database connected!'));
//     //       const ToDo = await db.collection('todo');
//     //       const ToDos = await db.collection('todos');  
//     //     } catch (err) {
//     //       console.error(err);
//     //     }
//     // })();
//   return db;

// };

const database = async (exists) => {
  try {
    await MongoClient.connect(MONGO_URL,{ useNewUrlParser: true }, function(err, db) {
        if(err) throw err;
        const database = db.db('todo_list_api_db');
        if(!exists) createCollections(database);
        const ToDos = database.collection('todos');
        return graphql_tools.makeExecutableSchema({
          typeDefs,
          resolvers
        });
    });
  } 
  catch (e) {
    throw e;
  }
};

module.exports = createCollections;