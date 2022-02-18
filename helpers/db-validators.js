

const coleccionesPermitidas = (coleccion = '', colecciones = [] )=> {
    const incluida = colecciones.includes( coleccion );
    if(!incluida) {
        throw new Error(`La coleccion ${ coleccion } no es permitida`)
    }
    return true;
}

const isUsernameLengthValid = ( username = '') => {
    if(username.length<5 || username.length>=50) throw new Error("The username's length must be grater than 5 characters and lower than 50 characters")
    return true
}

const isPasswordLengthValid = ( password = '') => {
    if(password.length<5 || password.length>=50) throw new Error("The password's length must be grater than 8 characters and lower than 50 characters")
    return true
}


module.exports = {
    coleccionesPermitidas,
    isUsernameLengthValid,
    isPasswordLengthValid
}