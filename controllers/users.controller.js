const User = require("../models/user.model.js");



const getUsers = async (req, res) => {

    const usuarios = await User.findAll();

    res.json({ usuarios });

}
const getUserById = async (req, res) => {
    const { user_id } = req.params;
    const usuario = await User.findByPk(user_id);


    if (usuario) {
        res.json({ usuario })
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${user_id}`
        });
    }

}

const postUser = async (req, res) => {

    const { body } = req;
    try {

    const usuario = new User(body);
    await usuario.save();

        res.json( usuario )
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador',
          
        });
    }
   

}

const putUser = async (req, res) => {

    const { user_id } = req.params
    const { body } = req;
    try {
        const usuario = await User.findByPk( user_id )
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id'+ user_id
            });
        }

        await usuario.update( body );

        res.json( usuario );



    } catch (error) {
        
    }
    res.json({
        msg: 'putUsuario',
        body,
        id
    })

}
const deleteUser = async (req, res) => {

    console.log(req.params)

    const { user_id } = req.params;

    const usuario = await User.findByPk( user_id )
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id'+ user_id
            });
        }

    await usuario.destroy();



    res.json(usuario)

}








module.exports = {
    getUsers,
    getUserById,
    postUser,
    putUser,
    deleteUser,


}