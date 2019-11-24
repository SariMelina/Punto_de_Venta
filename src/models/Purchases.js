'use strict'
const pool = require('../connection/connection');

let PurchaseModel = {};

PurchaseModel.getPurchases = (callback) => {
    if(pool){
        pool.query('SELECT * FROM compras', (err,rows) =>{
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
                callback(null, {'insertId': result.insertId})
            }
        });
    }
};


