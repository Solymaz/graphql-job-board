const fs = require("fs");
const { ApolloServer, gql } = require("apollo-server-express");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const db = require("./db");

const port = 9000;
const jwtSecret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

const app = express();
app.use(
  cors(),
  bodyParser.json(),
  expressJwt({
    secret: jwtSecret,
    credentialsRequired: false,
  })
);

/*first 3 steps to start the project
1- create typeDefs
2- create resolvers obj
3- ctreate apolloServer instance passing a configuration obj with typeDefs and resolvers
 ----> then we need to plug apolloServer into our existing express application by applying middleware method
*/

/*in order to load the schema file here and keep it separately instead of:
const typeDefs = gql``;
we call it as a regular function using fs as below
*/
//encoding: "utf8" option is to make sure that it reads the file as a string and not a binary file
const typeDefs = gql(fs.readFileSync("./schema.graphql", { encoding: "utf8" }));
const resolvers = require("./resolvers");
//with the help of this function we can access the "user" property from the context in resolvers.js
const context = ({ req }) => ({ user: req.user && db.users.get(req.user.sub) });
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});
apolloServer.applyMiddleware({ app, path: "/graphql" });
//the last 4 lines add GraphQL support.

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = db.users.list().find((user) => user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({ sub: user.id }, jwtSecret);
  res.send({ token });
});

app.listen(port, () => console.info(`Server started on port ${port}`));
