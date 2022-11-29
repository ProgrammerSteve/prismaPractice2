import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
const books = [{ author: "hey" }, { author: 'how' }];
const users = [
    {
        name: 'bill billy',
        email: 'testemail@gmail.com',
        projects: [{ title: 'Site upgrade - Summer 2021' }]
    },
    {
        name: 'Tom Johnson',
        email: 'fakeemail@gmail.com',
        projects: [{ title: 'Site upgrade - Summer 2021' }]
    },
];
const typeDefs = `#graphql

  type User {
    name: String
    email: String
    projects: [Project]
  }

  type Project {
    title: String
    active: Boolean
    members: [User]
  }

  type Query {
    users: [User]
  }
`;
const resolvers = {
    Query: {
        users: () => users,
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
