const express = require('express');
const router = express.Router();

const pool = require('../config');

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async(req, res) => {
    const { nombrePro, numExis, precioPro } = req.body;
    const newProducto = {
        nombrePro,
        numExis,
        precioPro
    };
    await pool.query('INSERT INTO productos set ?', [newProducto]);
    res.send('received');
    console.log(req.body);
});

module.exports = router;