// Model (sequelize)

// initial config
const Sequelize = require("sequelize");
const connection = require("./database");
const Questions = connection.define('questions', {    // table to create: 'questions'
    title: {
        type: Sequelize.STRING,
        alowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        alowNull: false
    }
},{});      // json for options empty (optional)

// sync with (create) table
Questions.sync({force: false}).then(() => {          // if table exists it forces no recreate
    console.log("Table created");
});      

module.exports = Questions;                         // enables to use the model outside