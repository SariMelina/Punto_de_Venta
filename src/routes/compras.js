const express = require('express');
const router = express.Router();

const pool = require('../connection/connection');

router.get('/nuevacom',(req, res) =>{
    res.render('links/newPurchase');
});

router.post('/nuevacom',async(req,res) => {
    const {fkUSu, fkPro , fecha , precio, hora} = req.body;
    const newPur = {
        fkUSu,
        fkPro,
        precio,
        fecha,
        hora
    };
    await pool.query('INSERT INTO compras set ?',[newPur]);
    res.redirect('/profile');
    console.log(req.body);
    await pool.query('UPDATE productos SET numExis = (numExis - 1) WHERE idPro = ?', [fkPro]);
    await pool.query('UPDATE compras, productos SET compras.precio = productos.precioPro WHERE productos.idPro = fkPro AND fkPro = ?', [fkPro]);
});

router.get('/totalcom',async(req,res)=>{
    const vercom = await pool.query('SELECT * FROM compras');
    res.render('links/totalcom', {vercom});
});
module.exports = router;