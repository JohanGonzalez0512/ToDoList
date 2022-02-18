const { DataTypes } = require('sequelize');
const { db } = require('../db/connection');
const User = db.define('user',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull : false
    },
    name:{
        type: DataTypes.STRING(50),
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    lastname:{
        type: DataTypes.STRING(50),
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    avatar:{
        type: DataTypes.STRING(200),
        defaultValue : ""
        
    },
    username:{
        type:DataTypes.STRING(50),
        allowNull : false,
        unique : true,
        validate : {
            notEmpty:true,
        }
    },
    password:{
        type: DataTypes.STRING(255),
        allowNull: false
    }
    
},{
    timestamps : false,
})

module.exports= User;