const Usuario = require('../models/Usuario');
const Orden = require('../models/Orden');
const Menu = require('../models/Menu');
const Categoria = require('../models/Categoria');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

// crear token
const crearToken = (usuario, secreta, expiresIn) => {
    const { id, correo } = usuario;
    return jwt.sign({ id, correo }, secreta, { expiresIn });
}

const resolvers = {
    Query: {
        obtenerOrdenes: async (__, { }, ctx) => {
            const ordenes = await Orden.find().populate({ path: "usuario" }).populate({path: "menu"});
            return ordenes;
        },
        obtenerCategorias: async (__, { }) => {
            const categorias = Categoria.find({});
            return categorias;
        },
        obtenerMenus: async (__, { }) => {
            const menus = Menu.find().populate({path: "categoria"});
            return menus;
        }
    },
    Mutation: {
        // Peticiones de usuario
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
        //  Peticiones de Ordenes
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

            orden = await Orden.findByIdAndUpdate({ _id: id }, input, { new: true });
            return orden;
        },
        eliminarOrden: async (__, { id }, ctx) => {
            let orden = await Orden.findById(id);

            //validamos que la orden este creada
            if (!orden) {
                throw new Error('Orden no encontrada');
            }

            await Orden.findByIdAndDelete({ _id: id });
            return 'Proyecto eliminado';
        },
        // Peticiones de categorias
        crearCategoria: async (__, { input }) => {
            const { nombre } = input;

            const categoriaCreada = await Categoria.findOne({ nombre });

            if (categoriaCreada) {
                throw new Error('La categoria ya se creo');
            }

            try {
                //crear categoria
                const categoriaNueva = new Categoria(input);
                categoriaNueva.save();
                return 'Categoria creada correctamente';
            } catch (error) {
                console.log(error);
            }
        },
        eliminarCategoria: async (__, { id }, ctx) => {
            let categoria = await Categoria.findById(id);

            //validamos que la orden este creada
            if (!categoria) {
                throw new Error('Categoria no encontrada');
            }

            await Categoria.findByIdAndDelete({ _id: id });
            return 'Categoria eliminada';
        },
        // Peticiones de Menu
        crearMenu: async (__, { input }) => {

            const { nombre, imagen, precio, categoria, estado_entrega, descripcion } = input;

            try {
                const nuevoMenu = Menu(input);
                nuevoMenu.save();
                return 'Menu creado';

            } catch (error) {
                console.log(error)
            }
        },
        actualizarMenu: async (__, { id, input }) => {
            let menu = await Menu.findById(id);

            //validamos que la orden este creada
            if (!menu) {
                throw new Error('Menu no encontrado');
            }

            menu = await Menu.findByIdAndUpdate({ _id: id }, input, { new: true });
            return menu;
        },
        eliminarMenu: async (__, { id }, ctx) => {
            let menu = await Menu.findById(id);

            //validamos que la orden este creada
            if (!menu) {
                throw new Error('Categoria no encontrada');
            }

            await Menu.findByIdAndDelete({ _id: id });
            return 'Menu Eliminado';
        },
    }
}

module.exports = resolvers;