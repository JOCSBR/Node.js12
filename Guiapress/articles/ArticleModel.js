// Article Model

// config
const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/CategoryModel");        // model to define a relationship

// database config
const Article = connection.define("articles",{      // table definition + fields
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Models relationship + database sync
Article.belongsTo(Category);    // 1:1 relationship
Category.hasMany(Article);      // 1:n relationship

// Article.sync({force: true});         // executed only 1st time

module.exports = Article;
