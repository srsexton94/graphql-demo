const { GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLString } = require('graphql')
const { pokemon, trainers, PokemonType, TrainerType } = require('./data')

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation',
  fields: () => ({
    addPokemon: {
      type: PokemonType,
      description: 'Add a single pokemon',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        trainerId: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, { name, trainerId }) => {
        const newPokemon = { id: pokemon.length++, name, trainerId }
        pokemon.push(newPokemon)
        return newPokemon
      }
    }
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
    },
    sgPokemon: {
      type: PokemonType,
      description: 'A single Pokemon',
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => pokemon.find(pokemon => pokemon.id == args.id)
    },
    trainer: {
      type: TrainerType,
      description: 'A single Trainer',
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => trainers.find(trainer => trainer.id == args.id)
    },
    trainers: {
      type: new GraphQLList(TrainerType),
      description: 'List of All Trainers',
      resolve: () => trainers
    }
  })
})

module.exports = { RootMutationType, RootQueryType }