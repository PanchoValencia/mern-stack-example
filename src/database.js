const mongoose = require('mongoose');

const URL = 'mongodb://localhost/mern-tasks';
mongoose.connect(URL) //ruta de la base de datos, ya sea local o desde algun servidor
    .then(db => console.log('DB is connected'))
    .catch(err => console.log('DB IS NOT CONNECTED'));

module.exports = mongoose;
