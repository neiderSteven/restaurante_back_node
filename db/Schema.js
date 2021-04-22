const { gql } = require('apollo-server');

const typeDefs = gql`
    type Orden {
        _id: ID
        usuario: Usuario
        menu: [Menu]
        descripcion: String
        estado_preparacion: String
        estado_pago: String
    }

    type Usuario {
        _id: ID
        nombre: String
        correo: String
        telefono: String
        direccion: String
    }

    type Categoria {
        _id: ID 
        nombre: String
    }

    type Menu {
        _id: ID
        nombre: String
        imagen: String 
        precio: Int 
        categoria: [Categoria]
        estado_entrega: String
        descripcion: String
    }

    type Token {
        token: String
    }

    # Querys
    type Query {
        obtenerOrdenes: [Orden]
        obtenerCategorias: [Categoria]
        obtenerMenus: [Menu]
    }

    # Inputs
    input UsuarioInput {
        nombre: String!
        correo: String!
        password: String!
        telefono: String!
        direccion: String!
    }

    input CategoriaInput {
        nombre: String!
    }

    input OrdenInput {
        usuario: ID!
        menu: [ID]
        descripcion: String!
        estado_preparacion: String!
        estado_pago: String!
    }

    input MenuInput {
        nombre: String! 
        imagen: String! 
        precio: Int! 
        categoria: [ID!]! 
        estado_entrega: String! 
        descripcion: String
    }

    input AutenticarInput {
        correo: String!
        password: String!
    }

    # Mutation
    type Mutation {
        # Usuario
        crearUsuario(input: UsuarioInput): String
        autenticarUsuario(input: AutenticarInput): Token

        # Orden
        nuevaOrden(input: OrdenInput): Orden
        actualizarOrden(id:ID!, input: OrdenInput): Orden
        eliminarOrden(id: ID!): String

        # Categoria
        crearCategoria(input: CategoriaInput): String
        eliminarCategoria(id: ID!): String

        # Menu
        crearMenu(input: MenuInput): String
        actualizarMenu(id:ID!, input: MenuInput): Menu
        eliminarMenu(id: ID!): String
    }
`;

module.exports = typeDefs;