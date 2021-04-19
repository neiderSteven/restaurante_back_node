const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const conexion = async () => {
    try {
        await mongoose.connect(process.env.DB_URL_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true
        });
        console.log('Base de datos conectada...')
    } catch (error) {
        console.log('Error conectando base de datos');
        console.log(error);
        process.exit(1);
    }
}

module.exports = conexion;