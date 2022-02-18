const { DataTypes } = require("sequelize");
const { db } = require("../db/connection");
const ToDo = db.define('toDo',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    body:{
        type:DataTypes.STRING(500),
        allowNull: false,
        validate:{
            notEmpty : true
        }
    },
    date:{
        type:DataTypes.DATE,
        defaultValue : new Date()
    },
    completed:{
        type:DataTypes.BOOLEAN,
        defaultValue : false
    }
},{
    timestamps : false
})


module.exports = ToDo;
