const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    registro: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('Usuario', UsuarioSchema);