const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '.env'});

// crea token
const crearToken = (usuario, secreta, expiresIn) => {
    const { id, correo } = usuario;

    return jwt.sign({ id, correo}, secreta, { expiresIn });
}

const resolvers = {
    Query: {

    },
    Mutation: {
        crearUsuario: async (__, { input }) => {
            const { nombre, correo, password, telefono, direccion } = input;

            const usuarioCreado = await Usuario.findOne({ correo });

            if (usuarioCreado) {
                throw new Error('El usuario ya se creo');
            }

            try {
                //encriptar contraseña
                const salt = await bcryptjs.genSalt(10);
                input.password = await bcryptjs.hash(password, salt);

                //crear usuario
                usuarioNuevo = new Usuario(input);
                console.log(usuarioNuevo);
                usuarioNuevo.save();
                return 'Usuario creado correctamente';
            } catch (error) {
                console.log(error);
            }
        },
        autenticarUsuario: async (__, { input }) => {

            const { correo, password } = input;

            // revisar que el usuario existe
            const usuarioCreado = await Usuario.findOne({ correo });

            if (!usuarioCreado) {
                throw new Error('El usuario no existe');
            }

            // Validar password
            const passwordCorrecto = await bcryptjs.compare(password, usuarioCreado.password);

            if (!passwordCorrecto) {
                throw new Error('Password Incorrecto');
            }

            // retorna token
            return {
                token: crearToken(usuarioCreado, process.env.SECRETA, '4hr')
            };
        }
    }
}

module.exports = resolvers;