const { Router } = require("express");
const { check } = require("express-validator");
const { login, signup } = require("../controllers/auth.controller");
const { lengthUsername, isUsernameLengthValid, isPasswordLengthValid } = require("../helpers/db-validators");
const { validateFileds } = require("../helpers/validateFields");
const { isUsernameDuplicated } = require("../middlewares/dbValidations");


const authRouter = Router();


authRouter.post('/login',[
    check('username',"The username is required and musn't be empty").isString().notEmpty(),
    check('password',"The password id required and musn't be empty").isString().notEmpty(),
    validateFileds,
]
,login);

authRouter.post('/signup',[
    check('name',"The name is required and musn't be empty").isString().notEmpty(),
    check('lastname',"The lastname id required and musn't be empty").isString().notEmpty(),
    check('username',"The username is required and musn't be empty").isString().notEmpty().custom(isUsernameLengthValid),
    check('password',"The password id required and musn't be empty").isString().notEmpty().custom( isPasswordLengthValid),
    validateFileds,
    isUsernameDuplicated
],signup)


module.exports = authRouter;
