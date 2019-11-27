'use strict'

const productos = require('../models/Products');

module.exports = function(app) {
    app.get('/productos', (req, res) => {
        productos.getProduct((err, data) => {
            res.status(200).json(data);
        });
    });
    app.get('/productos/:idPro', (req, res) => {

        var idPro = req.params.idPro;
        productos.getAProduct(idPro, (err, data) => {
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
            if (data && data.insertId) {
                res.json({
                    success: true,
                    msg: 'Producto insertado correctamente',
                    data: data
                })
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error al insertar el producto'
                })
            }
        })
    });

    app.put('/productos/:idPro', (req, res) => {
        const productData = {
            idPro: req.params.idPro,
            nombrePro: req.body.nombrePro,
            numExis: req.body.numExis,
            precioPro: req.body.precioPro
        };

        productos.updateProduct(productData, (err, data) => {
            if (data && data.msg) {
                res.json(data)
            } else {
                res.json({
                    success: false,
                    msg: 'error'
                })
            }
        })
    });

    app.delete('/productos/:idPro', (req, res) => {
        productos.deleteProduct(req.params.idPro, (err, data) => {
            if (data && data.msg == 'deleted' || data.msg == 'not exists') {
                res.json({
                    success: true,
                    data
                })
            } else {
                res.status(500).json({
                    msg: 'Error'
                })
            }
        })
    })
}