// TODO: Modularize the MongoDB/GraphQL database api

/* A resolver takes in four arguments:
  root - returns the result of the query from the parent value.
  args - takes in arguments.
  context - is used to share the same object with each resolver method.
  info - is used to get the information about the GraphQL.
*/

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

module.exports = resolvers;

