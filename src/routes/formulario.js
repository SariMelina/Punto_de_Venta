const express = require('express');
const router = express.Router();

const pool = require('../connection/connection');

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async(req, res) => {
    const { idPro, nombrePro, numExis, precioPro } = req.body;
    const newProducto = {
        //idPro,
        nombrePro,
        numExis,
        precioPro
    };
    await pool.query('INSERT INTO productos set ?', [newProducto]);
    req.flash('success', 'Product saved successfully');
    res.redirect('/totalpro');
});

router.get('/totalpro', async(req, res) => {
    const produc = await pool.query('SELECT * FROM productos');
    res.render('links/list', { produc });
});

router.get('/eliminar/:idPro', async(req, res) => {
    const { idPro } = req.params;
    await pool.query('DELETE FROM productos WHERE idPro = ?', [idPro]);
    req.flash('success', 'Product deleted successfully');
    res.redirect('/totalpro');
});
module.exports = router;