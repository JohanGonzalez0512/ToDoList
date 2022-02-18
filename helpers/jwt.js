const { sign } = require('jsonwebtoken');
const createJWT = (id,username) => {
    return new Promise((resolve, reject) => {
        const payload = { id, username }
        sign(payload, process.env.SECRET_JWT, {
            expiresIn: '3h'
        }, (err, token) => {
            if (err) {
               

                console.log(err)
                reject('No se pudo generar el token')
            }

            resolve(token)
        })
    })

}


module.exports = {
    createJWT
}