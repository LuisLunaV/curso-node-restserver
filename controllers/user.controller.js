const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');

const users = {

    userGet : (req = request, res = response)=>{
        const query = req.query;
        res.status(200).json({
            msg: 'get Api - controlador',
            query
        })
    },

    userPut : (req, res)=>{
        
        const id = req.params.id;

        res.status(500).json({
            msg: 'put Api - controlador',
            id

        })
    },

    userPost : async(req, res)=>{

        const errors = validationResult(req);
        if( !errors.isEmpty() ){

            return res.status(400).json(errors);
            
        }
        
        // const {id, nombre, edad} = req.body;
        const {nombre, correo, password, rol} = req.body;
        const usuario = new Usuario( {nombre, correo, password, rol} );

        //Verificar si el correo existe
        const existeEmail = await Usuario.findOne({ correo });
        console.log(existeEmail);
        if( existeEmail ){
            return res.status(400).json({
                msg: 'Este correo ya esta registrado'
            })
        }

        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(); //=> Es el numero de vueltas para volver mas complicada la encripatacion bcryptjs.genSaltSync(20), bcryptjs.genSaltSync(100), etc.
        usuario.password = bcryptjs.hashSync(password, salt);


        //Guardar en base de datos
        await usuario.save();

        res.status(201).json({
            msg: 'post Api - controlador',
            usuario
        });
    },

    userDelete : (req, res)=>{
        res.status(200).json({
            msg: 'delete Api - controlador'
        })
    }

};



module.exports = {

    users
};