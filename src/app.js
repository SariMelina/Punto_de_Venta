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
const morgan = require('morgan');
const bodyParser = require('body-parser'); //SE NECESITA PARA ENTENDER LAS PETICIONES 'post'
const exphbs = require('express-handlebars'); // Motor hbs, frontend app
const path = require('path');
const passport = require('passport');

var config = require('./config');

//Initializations
const app = express();
require('./lib/passport');

// settings
app.set('views', path.join(__dirname, 'views')); //Search the folder views
app.engine('.hbs', exphbs({ //Motor frontend
    defaultLayout: 'main', //File principal of the views
    layoutsDir: path.join(app.get('views'), 'layouts'), //bring the route views with __dirname and join with layouts
    partialsDir: path.join(app.get('views'), 'partials'), //Declaración de las carpetas donde se alojarán archvios. 
    extname: '.hbs', //Indica extensión de terminación de los archivos pertenecientes a Handlebars
    helpers: require('./lib/handlebars') //Función de fecha realizadas por separado
}));
app.set('view engine', '.hbs'); //'.hbs motor name'


// Middlewares
// funciones que se ejecutan cuando se recibe una peticion
app.use(morgan('dev')); //utilizar morgan en su configuración de desarrollo dev
app.use(express.urlencoded({ extended: false })); //It will only allow Strings
app.use(bodyParser.json()); //entender las peticiones a traves de json
app.use(passport.initialize()); //Start passport
app.use(passport.session()); //Save sessions

//Variables globales
app.use((req, res, next) => {
    app.locals.user = req.user; //Volvemos a la variable 'user' global, se puede acceder desde cualquier parte
    next();
});

// Routes, URL
require('./routes/userRoutes')(app); //rutas definidas
require('./routes/ProductsRoutes')(app);
require('./routes/PurchaseRoutes')(app);
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use(require('./routes/formulario'));
app.use(require('./routes/compras'));

// Public, Folders that the application can access 
app.use(express.static(path.join(__dirname, 'public'))); //Search the file 'public'

// UTILIZAR EL PUERTO
app.listen(config.port, () => {
    console.log(`server running on http://localhost:${config.port}`);
});