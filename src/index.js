const express = require('express'); //requerimos express y se almacena en una constante
const morgan  = require('morgan');
const path    = require('path'); //module para rutas, viene instalado con node por defecto
const { mongoose } = require('./database');

const app     = express(); //iniciamos express y creara un objeto, por lo cual hay que guardarlo en una constante

// Settings
app.set('port' , process.env.PORT || 3000); //establece el valor de la variable port

// Middlewares
app.use(morgan('dev')); //envia informacion en mensajes a la consola
app.use(express.json()); //enviar y recibir datos en formato json, react -> back -> react, antes era bodyParser

// Routes
app.use('/api/tasks' , require('./routes/task.routes'));

// Static files
app.use(express.static(path.join(__dirname , "public"))); //__dirname es una constante que nos da node que contiene la ruta de este archivo, y concatenamos la carpeta public para acceder a las vistas

// Starting server
app.listen(app.get('port') , () => { // obtiene el valor de la variable port
    console.log(`Server listen on port ${app.get('port')}`);
});
