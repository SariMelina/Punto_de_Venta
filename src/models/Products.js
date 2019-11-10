
'use strict'
 const pool = require('../connection/connection');

 let ProductModel = {};

 ProductModel.getProduct = (callback) => {
     if(pool){
         pool.query('SELECT * FROM productos ORDER BY idPro', (err, rows) => {
             if(err){
                 throw err;
             } else{
                 callback(null, rows);
             }
         })
     }
 };
 ProductModel.insertProduct = (productData, callback) => {
    if(pool){
        pool.query('INSERT INTO productos SET ?', productData,
        (err, result) => {
            if(err){
                throw err;
            } else{
                callback(null, {
                    'insertId': result.insertId
                })
            }
        })
    }
 }

 ProductModel.updateProduct = (productData, callback) => {
     if(pool){
         const sql = `
         UPDATE productos SET
         nombrePro = ${pool.escape(productData.nombrePro)},
         numExis = ${pool.escape(productData.numExis)},
         precioPro = ${pool.escape(productData.precioPro)}
         WHERE idPro = ${pool.escape(productData.idPro)}
         `
         pool.query(sql, (err, result) => {
             if(err){
                 throw err;
             } else{
                 callback(null, {
                     "msg":"success"
                 });
             }
         });
     }
 };

 ProductModel.deleteProduct = (idPro, callback) => {
     if(pool){
         let sql = `
         SELECT * FROM productos WHERE idPro = ${pool.escape(idPro)}
         `;

         pool.query(sql, (err, row) => {
             if(row){
                 let sql = `
                 DELETE FROM productos WHERE idPro = ${idPro}
                 `;
                 pool.query(sql, (err, result) => {
                     if(err){
                         throw err;
                     } else{
                         callback(null, {
                             msg: 'deleted'
                         })
                     }
                 })
             } else{
                 callback(null, {
                     msg: 'not exists'
                 })
             }
         });
     }
 };

 module.exports = ProductModel;