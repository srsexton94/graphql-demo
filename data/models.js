const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList } = require('graphql')
const { pokemon } = require('./pokemon.json')
const { trainers } = require('./trainers.json')

const TrainerType = new GraphQLObjectType({
  name: 'Trainer',
  description: 'A single trainer that trains pokemon',
  fields: () => ({ 
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString)},
    pokemon: {
      type: GraphQLList(PokemonType),
      resolve: (trainer) => {
        return pokemon.filter(pokemon => pokemon.trainerId === trainer.id)
      }
    }
  })
})

const PokemonType = new GraphQLObjectType({
  name: 'Pokemon',
  description: 'A single pokemon trained by a trainer',
  fields: () => ({ 
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString)},
    trainerId: { type: GraphQLNonNull(GraphQLInt) },
    trainer: { 
      type: TrainerType,
      resolve: (pokemon) => {
        return trainers.find(trainer => trainer.id === pokemon.trainerId)
      }
    }
  })
})

module.exports = { PokemonType, TrainerType }