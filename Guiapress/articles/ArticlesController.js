// controller for Articles

// configuration
const express = require("express");
const router = express.Router();            // used to create routes in different programs, instead "app"

// routes definitions
router.get("/articles", (req,res) => {
    res.send("Articles root");
});

router.get("/admin/articles/new", (req,res) => {
    res.render("admin/articles/new");
});

module.exports = router;
