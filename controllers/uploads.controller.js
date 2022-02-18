const { response } = require("express");
const path = require('path')
const fs = require('fs')
const { subirArchivo } = require("../helpers/subir-archivo");
const  {User} = require('../models/index')


const cargarArchivo = async (req, res) => {

try {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos que subir' });
        return
    }


    const nombre = await subirArchivo(req.files, undefined, 'usuarios');

    res.json({nombre})
} catch (msg) {
    res.status(400).json({msg});
}
   

}


const actualizarImagen = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos que subir' });
        return
    }
    const { id, coleccion}= req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await User.findByPk(id);
            if (!modelo ){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                })
            }
            break;


        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' })
    }


    //Limpiar imagenes previas
    if (modelo.avatar){
        const pathImagen = path.join(__dirname,'../uploads',coleccion, modelo.avatar);
        if (fs.existsSync( pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }


    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.update({avatar:nombre})
    




    res.json({modelo})

}

const mostrarImagen = async (req, res) => {
    const { id, coleccion}= req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await User.findByPk(id);
            if (!modelo ){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                })
            }
            break;


        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' })
    }


    //Limpiar imagenes previas
    if (modelo.avatar){
        const pathImagen = path.join(__dirname,'../uploads',coleccion, modelo.avatar);
        if (fs.existsSync( pathImagen)) {
            return res.sendFile(pathImagen)
        }
    }



    res.json({msg: 'falta place holder'})
}






module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}