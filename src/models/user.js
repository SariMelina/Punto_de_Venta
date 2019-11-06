// USAR MYSQL
const mysql = require ('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password: 'Melina123',
    database: 'Proyecto' 
});

let userModel = {};

userModel.getUsers = (callback) => {
    if(connection){
        connection.query ('SELECT * FROM users ORDER BY idUsu',
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