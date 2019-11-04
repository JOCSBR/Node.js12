// initial config
const Sequelize = require("sequelize");
const connection = new Sequelize('questions_guide','root','rootpwd2019',{
    host: 'localhost',
    dialect: 'mysql'
}); 

module.exports = connection;

