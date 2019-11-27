'use strict'
module.exports = {
    port: process.env.PORT || 3000,
    database: {
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: 'abc123', //your database pass
        database: 'Proyecto'
    }
}