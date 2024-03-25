import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// * Database
import db from "./DataBase/db.js";

// * types
import { typeDefs } from "./Schema/schema.js";

const resolvers = {


  Query: {
    //TODO to get whole array
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },
    //TODO to get single obj
    author(_, arg) {
      return db.authors.find((item) => item.id === arg.id);
    },
    game(_, arg) {
      return db.games.find((item) => item.id === arg.id);
    },
    review(_, arg) {
      return db.reviews.find((item) => item.id === arg.id);
    }
  },

  //TODO to get nested properties in single obj
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return db.authors.find((author) => author.id === parent.author_id);
    },
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
  },


  //TODO Mutations(CRUD)
  Mutation : {
    deleteGame( _ , arg ){
        db.games = db.games.filter( game => game.id !== arg.id )
        return db.games
    },
    addGame( _ , arg ){
        const game = {
            ...arg.game,
            id : Math.floor(Math.random() * 100).toString()
        }
        db.games.push(game)

        return game
    },
    updateGame( _ , arg ){
        db.games = db.games.map( g => {
            if(g.id === arg.id){
                return { ...g , ...arg.edits }
            }
            return g
        } )

        return db.games.find( item => item.id === arg.id )
    }
  }
};

// * server setup
const server = new ApolloServer({
  // ? requires two property -> typeDefs & resolvers
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("server listening to port 4500");
