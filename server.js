const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = require('graphql')

const { pokemon } = require('./data/pokemon.json')
// const { trainers } = require('./data/trainers.json')

const app = express()

const PokemonType = new GraphQLObjectType({
  name: 'Pokemon',
  description: 'A single pokemon trained by a trainer',
  fields: () => ({ 
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString)},
    trainerId: { type: GraphQLNonNull(GraphQLInt) }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: () => ({
    pokemon: {
      type: new GraphQLList(PokemonType),
      description: 'List of All Pokemon',
      resolve: () => pokemon
    }
  })
})
const schema = new GraphQLSchema({ query: RootQueryType })

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))
app.listen(5000, () => console.log('Server running'))