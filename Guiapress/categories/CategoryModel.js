// Category Model

// config
const Sequelize = require("sequelize");
const connection = require("../database/database");

// database config
const Category = connection.define("categories",{      // table definition + fields
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// sync with database (relationships)
// Category.sync({force: true});           // executed only 1st time

module.exports = Category;
