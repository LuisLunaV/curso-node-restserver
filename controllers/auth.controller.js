const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-JWT');


const login = async(req, res)=>{

    const { correo, password } =req.body;

    try {
        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            })
        }

        //Validar si el usuario esta activo en mi BD
        if( !usuario.estado ){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado: false'
            })
        }

        //Verificar la contraseña
        const contraseñaValida = bcryptjs.compareSync( password, usuario.password);
        if( !contraseñaValida ){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password invalido'
            })
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({

            usuario,
            token
        });
         
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}


module.exports = {
    login
}