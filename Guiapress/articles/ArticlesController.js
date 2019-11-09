// controller for Articles

// configuration
const express = require("express");
const router = express.Router();            // used to create roots in different programs, instead "app"

router.get("/articles", (req,res) => {
    res.send("Articles root");
});

router.get("/articles/new", (req,res) => {
    res.send("New articles root");
});

module.exports = router;
