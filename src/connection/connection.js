'use strict'
const config = require('../config')
const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
})

pool.getConnection((err,connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection was closed.')
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has to many connections.')
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED.')
        }
        if(err.code === 'ER_ACCESS_DENIED_ERROR'){
            console.error('DATABASE ACCESS DENIED')
        }
    }
    if(connection){
        console.log('database connection success')
        connection.release()
    }

    return
})
module.exports = pool