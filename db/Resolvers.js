const Usuario = require('../models/Usuario');
const Orden = require('../models/Orden');
const Menu = require('../models/Menu');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '.env'});

// crear token
const crearToken = (usuario, secreta, expiresIn) => {
    const { id, correo } = usuario;
    return jwt.sign({ id, correo}, secreta, { expiresIn });
}

const resolvers = {
    Query: {
        obtenerOrdenes: async (__, {}, ctx) => {
            const ordenes = await Orden.find();
            return ordenes;
        }
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
        },
        nuevaOrden: async (__, { input }) => {

            const { usuario, menu, descripcion, estado_preparacion, estado_pago } = input;

            try {

                const ordenNueva = Orden(input);
                const orden = await ordenNueva.save();
                return orden;

            } catch (error) {
                console.log(error)
            }
        },
        actualizarOrden: async (__, { id, input }) => {
            let orden = await Orden.findById(id);

            //validamos que la orden este creada
            if (!orden) {
                throw new Error('Orden no encontrada');
            }

            orden = await Orden.findByIdAndUpdate({_id: id}, input, {new: true});
            return orden;
        },
        eliminarOrden: async (__, { id }, ctx) => {
            let orden = await Orden.findById(id);

            //validamos que la orden este creada
            if (!orden) {
                throw new Error('Orden no encontrada');
            }

            await Orden.findByIdAndDelete({_id: id});
            return 'Proyecto eliminado';
        }
    }
}

module.exports = resolvers;