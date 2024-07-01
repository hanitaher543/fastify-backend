const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dbhani', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  
});

module.exports = sequelize;