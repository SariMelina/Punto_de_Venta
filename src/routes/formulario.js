const express = require('express');
const router = express.Router();

const pool = require('../connection/connection');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add', isLoggedIn, async(req, res) => {
    const { nombrePro, numExis, precioPro } = req.body;
    const newProducto = {
        nombrePro,
        numExis,
        precioPro
    };
    await pool.query('INSERT INTO productos set ?', [newProducto]);
    req.flash('success', 'Product saved successfully');
    res.redirect('/totalpro');
});

router.get('/totalpro', isLoggedIn, async(req, res) => {
    const produc = await pool.query('SELECT * FROM productos');
    res.render('links/list', { produc });
});

router.get('/eliminar/:idPro', isLoggedIn, async(req, res) => {
    const { idPro } = req.params;
    await pool.query('DELETE FROM productos WHERE idPro = ?', [idPro]);
    req.flash('success', 'Product deleted successfully');
    res.redirect('/totalpro');
});
module.exports = router;