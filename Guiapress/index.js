// main program
// project: Guiapress

// initial configuration
const express = require("express");                 // include express
const app = express();                              // instantiate express
const bodyParser = require("body-parser");          // using with forms
const connection = require("./database/database");  // database connection (see ./database)

// import controllers routes
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

// define routes on express
// main route
app.get('/', (req,res) => {
    Article.findAll({                                   // find all articles
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {
        // renderize index.ejs, passing articles and their categories to view (because the join)
        // categories will be used on the navbar
        Category.findAll().then(categories => {
            res.render("index",{articles: articles, categories: categories});
        });              
    });
});

// route to get slug and show article
app.get("/:slug", (req,res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            // renderize article.ejs, passing articles and their categories to view (because the join)
            // categories will be used on the navbar
            Category.findAll().then(categories => {
                res.render("article",{article: article, categories: categories});
            });
            // OLD....res.render("article", {article: article});
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
});

// route to call one single category by their slug
app.get("/category/:slug", (req,res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]     // join with Article, retrieve related recors using sequelize
    }).then(category => {
        if(category != undefined) {
            Category.findAll().then(categories => {
                // passing a list of artcles from db (see include) + categories for homenavbar
                res.render("index", {articles: category.articles, categories: categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
});


// use routes defined on controllers
app.use("/", categoriesController);     // using "/" as prefix, can be any string phrase
app.use("/", articlesController);


// start application
app.listen(8080, () => {                // call app, defining port
    console.log("Server running!");
});