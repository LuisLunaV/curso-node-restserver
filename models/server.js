const express = require('express');
const cors    = require('cors');
const { dbConnection } = require('../database/config.db.js');

class Server {

    constructor(){
    this.app = express();
    this.port = process.env.PORT;

    this.usuariosRoutePath = '/api/usuarios';
    this.authPath = '/api/auth';

    //Conectar a base de datos
    this.conectarDB();

    //Middlewars
    this.middlewars();

    //Rutas de mi aplicacion
    this.routes();

    }

   async conectarDB(){
    await dbConnection();
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

        this.app.use( this.authPath, require('../routes/auth.routes.js'));
        this.app.use( this.usuariosRoutePath, require('../routes/user.routes.js'));


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