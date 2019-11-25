
'use strict'
const Purchase = require ('../models/Purchases');

module.exports = function (app){
    app.get('/compras', (req, res) => {
        Purchase.getPurchases((err, data) => {
            res.status(200).json(data);
        });
    });

    app.get('/compras/:fkPro', (req, res) => {
        var fkPro = req.params.fkPro;
        Purchase.getAPurchases(fkPro,(err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/compras', (req, res) => {
        const purchaseData = {
            fkUsu : req.body.fkUsu,
            fkPro : req.body.fkPro,
            precio : req.body.precio,
            fecha : req.body.fecha,
            hora : req.body.hora
        };
        Purchase.insertPurchase(purchaseData, (err, data) => {
            if (data && data.msg) {
                res.json ({
                    success : true,
                    msg : 'Purchase Added',
                    data : data
                })
            }else { 
                res.status(500).json({
                    success : false,
                    msg : 'Error'
                })
            }
        });
    });

    app.put('/compras/:fkPro',(req,res) => {
        const purchaseData = {
            fkUSu : req.body.fkUsu,
            fkPro : req.body.fkPro,
            precio : req.body.precio,
            fecha : req.body.fecha,
            hora : req.body.hora
        };

        Purchase.updatePurchase(purchaseData, (err, data) => {
            if(data && data.msg){
                res.json(data)
            }else {
                res.json({
                    success: false,
                    msg: 'error'
                })
            }
        })
    });  
}