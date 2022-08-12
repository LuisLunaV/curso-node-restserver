const { response, request } = require('express');

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

    userPost : (req, res)=>{
        
        // const body = req.body;
        const {id, nombre, edad} = req.body;

        res.status(201).json({
            msg: 'post Api - controlador',
            id,
            nombre,
            edad
        })
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