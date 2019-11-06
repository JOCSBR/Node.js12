// main program
// Questions Guide
// Node.js / Express / JavaScript / EJS / HTML / CSS / Bootstrap
// includes database creation if it doesn't exist
// execution: nodemon qgindex.js

// configuration
const express = require("express");
const app = express();
const bodyParser = require("body-parser");              // user-controlled input
const connection = require("./database/database");      // MySQL connection
const Questions = require("./database/Questions");      // import model, representing table
const Answers = require("./database/Answers");          // import model, representing table

// database connection
connection
    .authenticate()
    .then(() => {           // authentication OK
        console.log("DB connection OK")
    })
    .catch((msgErr) => {    // authentication NOT OK
        console.log(msgErr);
    })

// Express config
app.set('view engine','ejs');       // ejs engine
app.use(express.static('public'));  // static pages starting from /public
app.use(bodyParser.urlencoded({extended: false}));      //link bodyParser with Express
app.use(bodyParser.json());         // read form data via json (optional, used for API)

// roots definition
// Sequelize - equiv to select *,  fill a 'questions' var with db data as array 
app.get("/", (req,res) => {
    Questions.findAll({raw: true, order: [
        ['id','DESC']
    ]}).then(questions => {      
        // console.log(questions);
        res.render("qgindex.ejs", {
            questions: questions         // var receives db data from other var - continues to be an array
        });
    });            
});

// call a form to include a new question
app.get("/questions", (req,res) => {
    res.render("qgquestions");
});

// store data from new question into database
app.post("/savequestions", (req,res) => {   // post sends form to backend
    var Title = req.body.Title;             // body = bodyParser object
    var Descrip = req.body.Descrip;
    
    Questions.create({          // insert into table using Questions model
        title: Title,           // db field receives var
        description: Descrip
    }).then(() => {
        res.redirect("/");
    });
});

// call a form to show and answer a single question, showing all answers too
app.get("/question/:id", (req,res) => {
    var id = req.params.id;
    Questions.findOne({                 // model search one record on db
        where: {id: id}
    }).then(question => {               // if OK, receives the variable (can be 'empty' if not found)
        if(question != undefined){      // question found

            Answers.findAll({
                where: {questionId: question.id},    // where db field = id of answer
                order: [
                    ['id','DESC']
                ]
            }).then(answers => {                    // array (list) with all answers
                res.render("pgquestion.ejs",{
                    question: question,
                    answers: answers
                });
            });
        }else{                          // question not found
            res.redirect("/");
        }
    });
    //res.render("qgquestions");
});

// store data from an answer into database
app.post("/savereplay", (req,res) => {          // post sends form to backend
    var questionId = req.body.questionId;       // body = bodyParser object from form
    var descrAnswer = req.body.descrAnswer;

    Answers.create({                            // insert into table using Answers model
        questionId: questionId,                 // db field receives var
        descrAnswer: descrAnswer
    }).then(() => {
        res.redirect("/question/"+questionId);  // redirects to the question page
    });
});

// port definition and alert about running
app.listen(8081,()=> {
    console.log("App running!");
});
