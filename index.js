const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { db } = require("./src/db/db");
const cors = require("cors");
const path = require("path");
const http = require("http");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

db();

//types query/mutation/subscription
const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "./src/typeDefs"))
);

//resolvers
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./src/resolvers"))
);

let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();
const httpserver = http.createServer(app);

app.get("/", function (req, res) {
  res.json({ data: "api working" });
});

httpserver.listen(5000, function () {
  console.log(`server running on port 5000`);
  console.log(`gql path is /graphql`);
});
