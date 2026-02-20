const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Agregar un nuevo producto
router.post('/productos', productoController.crearProducto);

// Mostrar todos los productos
router.get('/productos', productoController.obtenerProductos);

// Mostrar un producto por id
router.get('/productos/:id', productoController.obtenerProductoPorId);

// Actualizar un producto existente
router.put('/productos/:id', productoController.actualizarProducto);

module.exports = router;
