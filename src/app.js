/*SE INSTALARON 4 MODULOS
    - morgan
    - mysql
    - body
    - express
    - express-handlebars
    - connect-flash
    - express-session
    - express-mysql-session
    - passport
*/

//INICIALIZAR 'express'
const express = require('express');

// LLAMAR AL MODULO MORGAN Y BODY PARSER
// PARA USAR middlewares
const morgan = require('morgan');
const bodyParser = require('body-parser'); //SE NECESITA PARA ENTENDER LAS PETICIONES 'post'
const exphbs = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
const passport = require('passport')

var config = require('./config');

const app = express();




// POR SI SE SUBE A UN SERVIDOR/NUBE
// settings
// ESCUCHEN UN PUERTO
// app.listen(3000);

// middlewares
// funciones que se ejecutan cuando se recibe una peticion
app.use(morgan('dev')); //utilizar morgan en su configuración de desarrollo dev
app.use(bodyParser.json()); //entender las peticiones a traves de json


// routes
require('./routes/userRoutes')(app); //rutas definidas
require('./routes/ProductsRoutes')(app);

// static files


// UTILIZAR EL PUERTO
app.listen(config.port, () => {
    console.log(`server running on http://localhost:${config.port}`);
});