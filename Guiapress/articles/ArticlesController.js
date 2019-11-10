// controller for Articles

// configuration
const express = require("express");
const router = express.Router();                // used to create routes in different programs, instead "app"
const Category = require("../categories/CategoryModel");  // Category model to select during the article edition
const Article = require("./ArticleModel");      // Model for Article
const slugify = require("slugify");             // slugify (after installed), convert strings to use on URLs

// routes definitions
// main route, listing articles
router.get("/admin/articles", (req,res) => {
    Article.findAll({                                               // finding articles in the database (model)
        include: [{model: Category}]                                // this include create a join with Category
    }).then(articles => {                           
        res.render("admin/articles/index",{articles: articles});    // passing the articles to the view
    });
});

// creates and edit new Article
router.get("/admin/articles/new", (req,res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories}); // passing categories to the view
    });
});

// Category save on database - post because receive data from form
router.post("/articles/save", (req,res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;       // refers to "select name="category" on new.ejs
    if(title != undefined){
        Article.create({
            title: title,
            slug: slugify(title),
            body: body,
            categoryId: category            // foreign key for Category on Article
        }).then(() => {
            res.redirect("/admin/articles");
        });
    }else{
        res.redirect("/admin/articles/new");
    }
});

// articles deletion
router.post("/articles/delete", (req,res) => {
    var id = req.body.id;           // see form name around the button in the ejs
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({      // delete record (model Category)
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            });
        }else{      // not a number
            res.redirect("/admin/articles");
        }
    }else{      // null
        res.redirect("/admin/articles");
    }
});


module.exports = router;
