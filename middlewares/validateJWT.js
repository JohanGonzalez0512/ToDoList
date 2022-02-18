const { response } = require("express");
const { verify, decode} = require('jsonwebtoken')
const validateJWT = ( req, res = response, next) => {
    const token = req.headers['token'];
    if(!token){
        return res.status(401).json({
            ok : false,
            msg : 'Es necesario enviar el token'
        })
    }

    try {
        const {id,username} = verify(token,process.env.SECRET_JWT)
        
            req.id = id;
            req.username = username;
        next()
        
    } catch (error) {
        return res.status(401).json({
            ok : false,
            msg : 'El token es inválido'
        })
    }

}


module.exports = validateJWT