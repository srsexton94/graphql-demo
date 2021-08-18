const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema } = require('graphql')

const { 
  RootMutationType: mutation, 
  RootQueryType: query 
} = require('./root')

const app = express()

const schema = new GraphQLSchema({ mutation, query })

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))
app.listen(5000, () => console.log('Server running'))