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

userModel.insertuser = 
module.exports = userModel;