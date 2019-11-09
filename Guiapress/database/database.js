// database connection
const Sequelize = require("sequelize");
const connection = new Sequelize("guiapress","root","rootpwd2019",{
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;
