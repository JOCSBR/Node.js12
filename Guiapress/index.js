// main program
// project: Guiapress

// initial configuration
const express = require("express");                 // include express
const app = express();                              // instantiate express
const bodyParser = require("body-parser");          // using with forms
const connection = require("./database/database");  // database connection (see ./database)

// import roots
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

// import Models
const Category = require("./categories/CategoryModel");
const Article = require("./articles/ArticleModel");

// config view engine + folder 'views'
app.set("view engine", "ejs");

// static + folder "public"
app.use(express.static("public"));

// body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// database
connection
    .authenticate()
    .then(() => {                                   // JavaScript promise
        console.log("Database connected");
    }).catch((error) => {
        console.log(error);
    });

// define roots on express
// main root
app.get('/', (req,res) => {
    // res.send("Welcome to my website");
    res.render("index");                // renderize index.ejs
});

// use roots defined on controllers
app.use("/", categoriesController);     // using "/" as prefix, can be any string phrase
app.use("/", articlesController);


// start application
app.listen(8080, () => {                // call app, defining port
    console.log("Server running!");
});