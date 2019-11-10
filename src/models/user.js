// USAR MYSQL
const pool = require('../connection/connection')

let userModel = {};

userModel.getUsers = (callback) => {
    if(pool){
        pool.query ('SELECT * FROM users ORDER BY idUsu',
            (err, rows)=>{
                if(err){
                    throw err;
                }else{
                    callback(null, rows); 
                }
            }
        )
    }
};

userModel.getanUser =(idUsu,callback)=>{
    if(pool){
        console.log(idUsu);
        pool.query(`SELECT * FROM users WHERE idUsu = '${idUsu}'`,(err,rows)=>{
            if(err){
                throw err;
            }else{
                callback(null,rows);
            }
        });
    }
}
userModel.insertUser = (userData, callback)=>{
    if(pool){
        pool.query('INSERT INTO users SET ?',userData,(err,result)=>{
            if(err){
                throw err;
            }else{
                callback(null,{
                    'insertId': result.insertId
                })
            }
        })
    }
} 
module.exports = userModel;