const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        hello: String
    }

    input UsuarioInput {
        nombre: String!
        correo: String!
        password: String!
        telefono: String!
        direccion: String!
    }

    input autenticarInput {
        correo: String!
        password: String!
    }

    type token {
        token: String
    }

    type Mutation{
        crearUsuario(input: UsuarioInput): String
        autenticarUsuario(input: autenticarInput): token
    }
`;

module.exports = typeDefs;