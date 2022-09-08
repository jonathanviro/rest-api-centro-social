const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

//const session = require('express-session');

const app = express();

//seteamos el motor de plantillas
app.set('view engine', 'ejs');

//seteamos la carpteta public para archivos estaticos
app.use(express.static('public'));

//Para procesar datos enviados desde forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//seteamos las variables de entorno
dotenv.config({ path: './env/.env' });

//para poder trabajar con cookies
app.use(cookieParser());

//cors
app.use(cors(options));

//Llamar el router
const router = require('./routes/router');
app.use(router.routes);

//Para eliminar el cache y que no se pueda volver con el boton de atras luego de que se haga LOGOUT
app.use(function (req, res, next) {
    //console.log(req);
    if (!req.usuarioLogin) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    }
    next();
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor corriendo en http://localhost:' + process.env.PORT || 3000);
});
