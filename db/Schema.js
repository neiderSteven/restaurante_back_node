const { gql } = require('apollo-server');

const typeDefs = gql`
    type Orden {
        usuario: ID
        menu: [ID]
        descripcion: String
        estado_preparacion: String
        estado_pago: String
        # fecha: Date
    }

    type Token {
        token: String
    }

    # Querys
    type Query {
        obtenerOrdenes: [Orden]
    }

    # Inputs
    input UsuarioInput {
        nombre: String!
        correo: String!
        password: String!
        telefono: String!
        direccion: String!
    }

    input OrdenInput {
        usuario: ID!
        menu: [ID]
        descripcion: String!
        estado_preparacion: String!
        estado_pago: String!
    }

    input AutenticarInput {
        correo: String!
        password: String!
    }

    # Mutation
    type Mutation {
        crearUsuario(input: UsuarioInput): String
        autenticarUsuario(input: AutenticarInput): Token
        nuevaOrden(input: OrdenInput): Orden
        actualizarOrden(id:ID!, input: OrdenInput): Orden
        eliminarOrden(id: ID!): String
    }
`;

module.exports = typeDefs;