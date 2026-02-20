const Producto = require('../models/Producto');

// POST agregar un nuevo producto
exports.crearProducto = async (req, res) => {
    try {
        const { sku, descripcion, marca, numeroEstante } = req.body;


        const datosProducto = {
            sku: sku || "SKU-TEMP-" + Date.now(),
            descripcion: descripcion || "Sin descripción",
            marca: marca || "Genérica",
            numeroEstante: numeroEstante !== undefined ? numeroEstante : 0
        };

        const nuevoProducto = new Producto(datosProducto);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET Muestra todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET Muestra un producto
exports.obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT Actualizar un producto existente
exports.actualizarProducto = async (req, res) => {
    try {
        const { sku, descripcion, marca, numeroEstante } = req.body;


        const updateData = {
            sku: sku || "SKU-UPDATED",
            descripcion: descripcion || "Descripción actualizada",
            marca: marca || "Marca actualizada",
            numeroEstante: numeroEstante !== undefined ? numeroEstante : 1
        };

        const productoActualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!productoActualizado) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(productoActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
