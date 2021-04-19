const mongoose = require('mongoose');

const OrdenSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    menu: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Menu'
    },
    descripcion: {
        type: String
    },
    estado_preparacion: {
        type: String,
        required: true
    },
    estado_pago: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('Orden', OrdenSchema);