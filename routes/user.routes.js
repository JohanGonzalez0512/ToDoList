const { Router} = require('express');
const { getUserById, getUsers, postUser, putUser, deleteUser, getTodosOfUser } = require('../controllers/users.controller');
const { check, param } = require('express-validator');
const { checkUserExistence } = require('../middlewares/dbValidations');
const { validateFileds } = require('../helpers/validateFields');
const { isUsernameLengthValid } = require('../helpers/db-validators');
const validateJWT = require('../middlewares/validateJWT');
const userRouter = Router();


userRouter.get('/',[validateJWT],    getUsers);
userRouter.get('/:user_id', [
    param('user_id','The user id is a number and is required').isNumeric().notEmpty(),
    validateFileds,
    validateJWT
   
]
,getUserById);
userRouter.put('/:user_id', [
    param('user_id','The user id is a number and is required').isNumeric().notEmpty(),
    check('name',"The name is required and musn't be empty").isString().notEmpty(),
    check('lastname',"The lastname id required and musn't be empty").isString().notEmpty(),
    check('username',"The username is required and musn't be empty").isString().notEmpty().custom(isUsernameLengthValid),
    validateFileds,
    validateJWT
    
] 
,putUser);
userRouter.delete('/:user_id', [
    param('user_id','The user id is a number and is required').isNumeric().notEmpty(),
    validateJWT
    
    
],deleteUser);

module.exports = userRouter