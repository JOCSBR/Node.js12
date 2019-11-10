// database connection
const Sequelize = require("sequelize");
const connection = new Sequelize("guiapress","root","rootpwd2019",{
    host: "localhost",
    dialect: "mysql",
    timezone: "-03:00"      // to be used on sequelize
});

module.exports = connection;
