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

    app.get('/users', (req, res) => {
        User.getUsers((err, data) => {
            res.json(data);
        });
    });


    app.get('/users/:idUsu',(req,res)=>{
        var idUsu = req.params.idUsu;
        User.getanUser(idUsu,(err,data)=>{
            res.status(200).json(data);
        })
    });

    app.post('/users',(req,res)=>{
        const userData = {
            idUsu: null,
            email: req.body.email,
            nombreUsu: req.body.nombreUsu,
            telUsu: req.body.telUsu,
            password: req.body.password
        };
        User.insertUser(userData,(err,data)=>{
            if (data && data.insertId) {
                res.json({
                    success: true,
                    msg: 'User Added',
                    data: data
                })
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'error'
                })
            }
        })
    });
    app.put('/users/:idUsu',(req,res)=>{
        const userData = {
            idUsu: req.params.idUsu,
            email: req.body.email,
            nombreUsu: req.body.nombreUsu,
            telUsu: req.body.telUsu,
            password: req.body.password
        }
        User.updateUser(userData,(err, data)=>{
            if(data &&data.msg){
                res.json(data)
            }else{
                res.json({
                    success: false,
                    msg:'an error was ocurred'
                })
            }
        });
    });
}
