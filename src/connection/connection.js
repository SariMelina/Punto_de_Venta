'use strict'
const util = require('util');
const mysql = require('mysql')
const { database } = require('../config')

const pool = mysql.createPool(database)

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has to many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED.')
        }
        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('DATABASE ACCESS DENIED')
        }
    }
    if (connection) {
        console.log('database connection success')
        connection.release()
    }

    return
})

pool.query = util.promisify(pool.query); //Esta maravillosa línea de código fue la salvación

module.exports = pool