const { ApolloServer } = require('apollo-server');

const typeDefs = require('./db/Schema');
const resolvers = require('./db/Resolvers');
const conexiondb = require('./config/db');

conexiondb();

const PORT = process.env.PORT || 4000;


const server = new ApolloServer({typeDefs, resolvers});

server.listen(PORT).then(({url}) => {
    console.log(`Servidor corriendo en ${url}`);
})