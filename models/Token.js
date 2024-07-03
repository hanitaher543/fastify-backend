const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");




const Token = sequelize.define('Token',{

    id : {
        type: DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
    },
    accesToken : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    userId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : 'User',
            key : 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
});


module.exports = Token;