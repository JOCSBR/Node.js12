// Questions Guide
// Node.js / Express / JavaScript / EJS / HTML / CSS / Bootstrap
// nodemon qgindex.js

// configuration
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Questions = require("./database/Questions");      // import model, representing table

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
app.get("/", (req,res) => {
    Questions.findAll({raw: true}).then(questions => {      // equiv to select *,  fill a 'questions' var with db data as array
        // console.log(questions);
        res.render("qgindex.ejs", {
            questions: questions                            // var receives db data from other var - continues to be an array
        });
    });            
});

app.get("/questions", (req,res) => {
    res.render("qgquestions");
});

app.post("/savequestions", (req,res) => {   // post sends form to backend
    var Title = req.body.Title;             // body = bodyParser object
    var Descrip = req.body.Descrip;
    //res.send("Form received -> Title: " + Title + " Description: " + Descrip);
    
    Questions.create({          // insert into table using Questions model
        title: Title,           // db field receives var
        description: Descrip
    }).then(() => {
        res.redirect("/");
    });
});


app.listen(8081,()=> {
    console.log("App running!");
});
