const express = require('express')
const cors = require('cors');
const { userRouter, uploadRouter, todoRouter, authRouter} = require('../routes/index')
const fileUpload = require('express-fileupload')
const { db } = require('../db/connection');

class Server {

    apiPaths = {};

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.apiPaths = {
            usuarios: '/api/users',
            uploads: '/api/uploads',
            auth : '/api/auth',
            todos : '/api/todos'

        }
        this.dbConnection();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicacion 

        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            console.log(error);
        }
    }


    middlewares() {
        //CORS
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());

        //FileUpload
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

        this.app.use( express.static('public'));
    }


    routes() {
        this.app.use(this.apiPaths.usuarios, userRouter)
        this.app.use(this.apiPaths.uploads,  uploadRouter)
        this.app.use(this.apiPaths.auth,  authRouter)
        this.app.use(this.apiPaths.todos,  todoRouter)
        this.app.use('**',(req, res)=> {
            res.send('Hola Mundo')
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto', this.port);
        })
    }



}

module.exports = Server



