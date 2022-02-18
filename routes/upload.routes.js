const { Router} = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen} = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const validateJWT = require('../middlewares/validateJWT');

const uploadRouter = Router();

uploadRouter.post('/',[validateJWT], cargarArchivo);
uploadRouter.put('/:coleccion/:id',[
    check('id','El id debe de ser de mysql y es obligatorio').isNumeric().exists({checkNull:true}),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios'])),
    validateJWT
],actualizarImagen);

uploadRouter.get('/:coleccion/:id',[
    check('id','El id debe de ser de mysql y es obligatorio').isNumeric().exists({checkNull:true}),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios'])),
    validateJWT
], mostrarImagen);


module.exports = uploadRouter