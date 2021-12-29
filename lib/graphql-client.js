import { GraphQLClient } from "graphql-request";

let graphqlClient;

const createGraphQLClient = () => {
  return new GraphQLClient("http://localhost:3006/api/graphql", { credentials: "include" });
};

export function initializeGraphQL() {
  const _graphqlClient = graphqlClient ?? createGraphQLClient();

  // For SSG and SSR always create a new graphql Client
  if (typeof window === "undefined") return _graphqlClient;

  // Create the graphql Client once in the client
  if (!graphqlClient) graphqlClient = _graphqlClient;
  return _graphqlClient;
}
