const { Sequelize } = require('sequelize');

const User = Sequelize.model('User', {

    name : {
        type : String
    },
    lastname : {
        type : String
    },
    age : {
        type : Number
    } 

})





exports.module = User;