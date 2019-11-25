'use strict'
const pool = require('../connection/connection');

let PurchaseModel = {};

PurchaseModel.getPurchases = (callback) => {
    if(pool){
        pool.query('SELECT * FROM compras ORDER BY fkPro', (err, rows) => {
            if(err){
                throw err;
            } else{
                callback(null, rows);
            }
        })
    }
};

PurchaseModel.getAPurchases = (fkPro, callback) => {
    if(pool){
        console.log(fkPro);
        pool.query(`SELECT productos.idPro, productos.nombrePro, compras.fecha, compras.hora, compras.precio 
                    FROM compras JOIN productos  
                    ON productos.idPro=compras.fkPro 
                    WHERE fkPro=${fkPro}`, (err,rows) =>{
            if(err){
                throw err;
            } else{
                callback(null, rows);
            }
        })
    }
};

PurchaseModel.insertPurchase = (purchaseData, callback) => {
    if(pool){
        pool.query('INSERT INTO compras SET ?', purchaseData, (err,rows) =>{
            if(err){
                throw err;
            }else{
                callback(null,{msg:"success"})
            }
        });
    }
};
module.exports=PurchaseModel;

