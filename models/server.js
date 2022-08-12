const express = require('express');
const cors    = require('cors');

class Server {

    constructor(){
    this.app = express();
    this.port = process.env.port;
    this.usuariosRoutePath = '/api/usuarios';

    //Middlewars
    this.middlewars();

    //Rutas de mi aplicacion
    this.routes();

    }

    middlewars(){
        //Cors
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio pulico
        this.app.use(express.static('public'))
    }

    routes(){

        this.app.use( this.usuariosRoutePath, require('../routes/user.routes.js'))

    }

    listen(){
        

        this.app.listen(this.port, ( )=>{

            console.log('App lista desde puerto:',this.port);

        });
    }
}

module.exports={
    Server
}