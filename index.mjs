// Express
import express from "express";

// Apollo Server and its integrations for Express
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";

// HTTP
import http from "http";

// CORS to handle cross-origin requests
import cors from "cors";

// BodyParser to parse JSON request bodies
import bodyParser from "body-parser";

// Schema Types
import { typeDefs } from "./schema/index.mjs";

// Resolvers
import { resolvers } from "./resolvers/index.mjs";

const app = express();

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 4000;

// Apollo comes with plugins to handle its HTTP lifecycle
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageDisabled(),
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
});

await server.start();

// Add middleware for CORS, JSON parsing, and GraphQL handling
app.use(
  "/graphql",
  cors({
    origin: [process.env.REACT_APP_FRONTEND_URL],
  }),
  bodyParser.json(),
  expressMiddleware(server)
);

// Start the server
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
