const {Router} = require('express');
const { check, param } = require('express-validator');
const { getTodosByUserId, createTodoForUser, updateTodo, deleteTodo } = require('../controllers/todos.controller');
const { validateFileds } = require('../helpers/validateFields');
const { checkTodoExistence, checkUserExistence } = require('../middlewares/dbValidations');
const validateJWT = require('../middlewares/validateJWT');

const todoRouter = Router();

todoRouter.get('/users/:user_id',[
    check('user_id','The user id is a number and is required').isNumeric().notEmpty(),
    validateFileds,
    checkUserExistence,
    validateJWT
]
,getTodosByUserId)

todoRouter.post('/users/:user_id',[
    param('user_id',"The user id is a number and is required").isNumeric().notEmpty(),
    check('body',"The todo's body is required").isString().notEmpty(),
    validateFileds,
    checkUserExistence,
    validateJWT
]
,createTodoForUser)

todoRouter.put('/:todo_id',[
    param('todo_id',"The todo id is a number and is required").isNumeric().notEmpty(),
    check('body',"The todo's body is required").isString().notEmpty(),
    check('completed',"The todo's state is required").isBoolean().notEmpty(),
    validateFileds,
    checkTodoExistence,
    validateJWT
],updateTodo)

todoRouter.delete('/:todo_id',[
    param('todo_id',"The todo id is a number and is required").isNumeric().notEmpty(),
    validateFileds,
    checkTodoExistence,
    validateJWT
]
,deleteTodo)


module.exports = todoRouter
