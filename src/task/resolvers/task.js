const Task = require("../models/Task");

//query
const countTask = async (parent, args, { req }) => {
  return await Task.find().count();
};

const allTask = async (parent, args, { req }) => {
  return await Task.find();
};

//mutation
const newTask = async (parent, args, context) => {
  const { title, text } = args.input;
  let task = await Task.create({ title, text });
  return task;
};

module.exports = {
  Query: {
    countTask,
    allTask,
  },

  Mutation: {
    newTask,
  },
};
