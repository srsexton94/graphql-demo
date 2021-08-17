const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')

const app = express()
const name = 'HelloWorld'

const query = new GraphQLObjectType({
  name,
  fields: () => ({ 
    message: { 
      type: GraphQLString, 
      resolve: () => name 
    }
  })
})
const schema = new GraphQLSchema({ query })

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))
app.listen(5000, () => console.log('Server running'))