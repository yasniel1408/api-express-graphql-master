const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { db } = require("./src/db/db");
const cors = require("cors");
const http = require("http");
const { resolversTask, typeDefTask } = require("./src/task");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

db();

let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs: [typeDefTask],
    resolvers: [resolversTask],
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
