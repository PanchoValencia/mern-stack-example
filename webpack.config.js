module.exports = {
    entry  : './src/app/index.js', //ruta de donde toma el codigo a convertir
    output : { //destino del codigo
        path     : __dirname + '/src/public', //variable global que trae el valor de la ruta del proyecto y le concatenamos la ruta del file donde ira el archivo
        filename : 'bundle.js' //creara un archivo llamado bundle.js donde pondra todo el js convertido
    },

    module: {
        rules: [
            {
                use: 'babel-loader', //usa babel-loader
                test: /\.js$/, //expresion regular que le dice que traduzca todos los archivos .js que encuentre
                exclude: /node_modules/ //excluimos la traduccion de los archivos que esten en la carpeta node_modules
            }
        ]
    }
};
