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

userModel.updateUser = (userData, callback) => {
    if(pool){
        const sql = `
        UPDATE users SET 
        email = ${pool.escape(userData.email)},
        nombreUsu = ${pool.escape(userData.nombreUsu)},
        telUsu = ${pool.escape(userData.telUsu)},
        password = ${pool.escape(userData.password)}
        WHERE idUSu = ${pool.escape(userData.idUsu)}`

        pool.query(sql, (err , resul) => {
            if(err){
                throw err;
            }else {
                callback (null, {"msg" : "success"});
            }
        });
    }
};

userModel.deleteUser = (idUsu, callback) => {
    if(pool){
        let sql = `
            SELECT * FROM users WHERE idUsu = ${pool.escape(idUsu)}`
            pool.query(sql, (err, row) => {
                if(row){
                    let sql = `DELETE FROM users WHERE idUsu =${idUsu}`;
                    pool.query(sql, (err,result)=>{
                        if(err){
                            throw err  
                        }else{
                            callback(null,{msg:'User deleted'})
                        }
                    })
                }else{
                    callback(null, {msg: 'This user does not exits'})
                }
            })
    }
};


module.exports = userModel;