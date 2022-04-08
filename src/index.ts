import { ApolloServer } from "apollo-server";
import { connect } from "mongoose";

import { schema } from "./schema";

connect("mongodb://localhost:27017/flexBudgetDB").then(() => {
    console.log("Database connection successful");
});

const server = new ApolloServer({
    schema
});

const port = 3000;

server.listen({ port }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
