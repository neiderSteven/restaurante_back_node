const { ApolloServer } = require('apollo-server');

const typeDefs = require('./db/Schema');
const resolvers = require('./db/Resolvers');
const jwt = require('jsonwebtoken');
const conexiondb = require('./config/db');

require('dotenv').config({path: '.env'});

conexiondb();

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({typeDefs, resolvers, contex: ({req}) => {
    const token = req.headers['autorizacion'] || '';
    if (token) {
        try {
            const usuario = jwt.verify(token, process.env.SECRETA);
            return usuario;
        } catch (error) {
            console.log(error);
        }
    }
}});

server.listen(PORT).then(({url}) => {
    console.log(`Servidor corriendo en ${url}`);
})