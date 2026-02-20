const express = require('express');
const mongoose = require('mongoose');
const productoRoutes = require('./routes/productoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rutas
app.use('/api', productoRoutes);

// Conexión a MongoDB
const mongoURI = 'mongodb://127.0.0.1:27017/bodega';

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Conectado a MongoDB...');
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error conectando a MongoDB:', err.message);
    });
