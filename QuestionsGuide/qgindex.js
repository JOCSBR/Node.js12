// Questions Guide
// Node.js / Express / JavaScript / EJS / HTML / CSS / Bootstrap
// nodemon qgindex.js

// configuration
const express = require("express");
const app = express();
// Express config
app.set('view engine','ejs');       // ejs engine
app.use(express.static('public'));  // static pages starting from /public

// roots definition
app.get("/", (req,res) => {
    res.render("qgindex.ejs");
});

app.get("/questions", (req,res) => {
    res.render("qgquestions");
});


app.listen(8081,()=> {
    console.log("App running!");
});
