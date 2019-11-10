
'use strict'

const productos = require('../models/Products');

module.exports = function(app){
    app.get('/productos', (req, res) => {
        productos.getProduct((err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/productos', (req, res) => {
        const productData = {
            idPro: null,
            nombrePro: req.body.nombrePro,
            numExis: req.body.numExis,
            precioPro: req.body.precioPro
        };

        productos.insertProduct(productData, (err, data) => {
            if(data && data.insertId){
                res.json({
                    success: true,
                    msg: 'Producto insertado correctamente',
                    data: data
                })
            } else{
                res.status(500).json({
                    success: false,
                    msg: 'Error al insertar el producto'
                })
            }
        })
    });
}