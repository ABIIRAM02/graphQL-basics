
// * types -> Int , Float , String , Boolean , ID

export const typeDefs = `#graphqL 
    type Game {
        id: ID!,
        title : String!,
        platform : [String!]!,
        reviews : [Review!],
        author : Author!

    }

    type Review {
        id :ID!,
        rating : Int!,
        content : String!,
        game : Game!,
        author : Author!
    }

    type Author {
        id : ID!,
        name : String!,
        verified : Boolean!,
        reviews : [Review!],
        game : Game!
    }

    type Query {
        reviews : [Review]
        games : [Game]
        authors : [Author]
        author (id:ID!) : Author
        game (id:ID!) : Game
        review (id:ID!) : Review
    }

    type Mutation {
        addGame( game : AddGameInput ) : Game ,
        updateGame( id :ID! , edits : EditGameInput ) : Game
        deleteGame( id : ID! ) : [Game!]!,
    }

    input AddGameInput {
        title : String!,
        platform : [String!]!
    }

    input EditGameInput {
        title : String,
        platform : [String!]
    }
    
`
