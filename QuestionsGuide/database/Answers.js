// Answers Model (sequelize)

// initial config
const Sequelize = require("sequelize");
const connection = require("./database");

const Answers = connection.define('answers', {    // table to create: 'answers'
    questionId: {
        type: Sequelize.INTEGER,
        alowNull: false
    },
    descrAnswer: {
        type: Sequelize.TEXT,
        alowNull: false
    }
},{});      // json for options empty (optional)

// sync with table
Answers.sync({force: false});                     // if table exists it forces no recreate

module.exports = Answers;                         // enables to use the model outside
