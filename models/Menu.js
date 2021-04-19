const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    categoria: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Categoria'
    },
    estado_entrega: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Menu', MenuSchema);