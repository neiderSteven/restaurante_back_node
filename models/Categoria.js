const mongoose = require('mongoose');

const CategoriaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Categoria', CategoriaSchema);