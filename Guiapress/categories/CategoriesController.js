// Categories Controller

// configuration
const express = require("express");
const router = express.Router();                // used to create roots in different programs, instead "app"
const Category = require("./CategoryModel");    // Model for Category
const slugify = require("slugify");              // slugify (after installed), convert strings to use on URLs

// routes definitions
// Category register
router.get("/admin/categories/new", (req,res) => {
    res.render("admin/categories/new");
});

// Category save on database
router.post("/categories/save", (req,res) => {
    var title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories");
        });
    }else{
        res.redirect("/admin/categories/new");
    }
});

// table to list categories
router.get("/admin/categories", (req,res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index", {categories: categories});
    });
});

// categories deletion
router.post("/categories/delete", (req,res) => {
    var id = req.body.id;           // see form name around the button in the ejs
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({      // delete record (model Category)
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories");
            });
        }else{      // not a number
            res.redirect("/admin/categories");
        }
    }else{      // null
        res.redirect("/admin/categories");
    }
});

// Category edition
router.get("/admin/categories/edit/:id", (req,res) => {      // route receives the id to edit
    var id = req.params.id;                                 // receive the id via params of route
    if(isNaN(id)){                                          // validation avoiding id + other caracters in the route
        res.redirect("/admin/categories");
    };
    Category.findByPk(id).then(category => {
        if(category != undefined){
            res.render("admin/categories/edit", {category: category});
        }else{
            res.redirect("/admin/categories");
        }
    }).catch(error => {
        res.redirect("/admin/categories");
    });
});

router.post("/categories/update", (req,res) => {
    var id = req.body.id;                               // receives the data from the form
    var title = req.body.title;
    Category.update({title: title, slug: slugify(title)},{
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/categories");
    });
});

module.exports = router;
