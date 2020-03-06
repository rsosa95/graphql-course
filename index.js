const { ApolloServer, gql } = require('apollo-server');
const { v4 } = require('uuid');



const typeDefs = gql`
  enum Status {
    WATCHED
    INTERESTED
    NOT_INTERESTED
    UNKNOWN
  }

  type Actor {
    id: ID
    name: String
  }

  type Movie {
    id: ID!
    title: String
    releaseDate: String
    rating: Int
    actors: [Actor]
    status: Status
  }

  type Query {
    movies: [Movie]
    movie(id: ID): Movie
  }
`

const movies = [
  {
    id: v4(),
    title: '5 Deadly Venoms',
    releaseDate: '10-10-1983',
    rating: 5,
  },
  {
    id: v4(),
    title: '36th Chamber',
    releaseDate: '10-10-1983',
    rating: 5,
  }
]

const resolvers = {
  Query: {
    movies() {
      return movies;
    },
    movie(obj, { id }, context, info) {
      return movies.find(movie => movie.id === id);
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server started at ${url}`);
});
