const { gql } = require("apollo-server-express");

//types query/mutation/subscription
module.exports = gql`
  """
  A type that describes the task.
  """
  type Task {
    "The is the ID of Task."
    id: ID!
    "The is the title of Task."
    title: String!
    "The is the text of Task."
    text: String!
  }
  type Query {
    countTask: Int!
    allTask: [Task!]!
  }
  # input type
  input TaskInput {
    "The is the title of Task."
    title: String!
    "The is the text of Task."
    text: String!
  }
  # mutations
  type Mutation {
    newTask(input: TaskInput!): Task!
  }
`;
