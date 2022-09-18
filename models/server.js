const express = require('express');
const cors    = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config.db.js');

class Server {

    constructor(){
    this.app = express();
    this.port = process.env.PORT;

    this.paths ={
        auth       : '/api/auth',
        buscar     : '/api/buscar',
        categorias :  '/api/categorias',
        usuarios   : '/api/usuarios',
        productos  : '/api/productos',
        uploads    : '/api/uploads'
    }
;

    //Conectar a base de datos
    this.conectarDB();

    //Middlewars
    this.middlewars();

    //Rutas de mi aplicacion
    this.routes();

    }

    // Metodo para conectar la BD.
   async conectarDB(){
    await dbConnection();
   }

   //Metodo para los middlewars
    middlewars(){
        //Cors
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio pulico
        this.app.use(express.static('public'))

        //UpLoad - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true

        }));
    }

    //Metodo para llamar a las rutas
    routes(){

        this.app.use( this.paths.auth, require('../routes/auth.routes.js'));
        this.app.use( this.paths.buscar, require('../routes/buscar.routes'));
        this.app.use( this.paths.categorias , require('../routes/categorias.routes.js'));
        this.app.use( this.paths.productos, require('../routes/productos.routes.js'));
        this.app.use( this.paths.usuarios , require('../routes/user.routes.js'));
        this.app.use( this.paths.uploads, require('../routes/uploads.routes.js'));

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