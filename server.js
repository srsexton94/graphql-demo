const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLList } = require('graphql')
const { pokemon, trainers, PokemonType, TrainerType } = require('./data')

const app = express()

const query = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root query',
  fields: () => ({
    pokemon: {
      type: new GraphQLList(PokemonType),
      description: 'List of All Pokemon',
      resolve: () => pokemon
    },
    trainers: {
      type: new GraphQLList(TrainerType),
      description: 'List of All Trainers',
      resolve: () => trainers
    }
  })
})
const schema = new GraphQLSchema({ query })

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))
app.listen(5000, () => console.log('Server running'))