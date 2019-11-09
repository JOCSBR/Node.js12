// Categories Controller

// configuration
const express = require("express");
const router = express.Router();            // used to create roots in different programs, instead "app"

router.get("/categories", (req,res) => {
    res.send("Categories root");
});

router.get("/categories/new", (req,res) => {
    res.send("New categories root");
});

module.exports = router;
