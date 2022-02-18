const authRouter = require("./auth.routes");
const todoRouter = require("./todo.routes");
const uploadRouter = require("./upload.routes");
const userRouter = require("./user.routes");

module.exports = {
    userRouter,
    todoRouter,
    uploadRouter,
    authRouter
};
