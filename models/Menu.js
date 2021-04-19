const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
    estado_entrega: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    precio: {
        type: Boolean,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('Menu', MenuSchema);