// // usar express
// const express = require('express');
// // usar router
// const router = express.Router();//poder definir rutas de mi servidor

// //escribir rutas de mi servidor
// router.get('/', (req,res)=>{
//     res.json([]);
// });

// // exportar router
// module.exports = router;
const User = require('../models/user');
// OTRA FORMA DE IMPORTAR express
module.exports = function (app){

    app.get('/', (req, res) => {
        User.getUsers((err, data) => {
            res.json(data);
        });
    });
}
