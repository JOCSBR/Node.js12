// configuration
const express = require("express");
const app = express();
// Express config
app.set('view engine','ejs');       // ejs engine
app.use(express.static('public'));  // static pages starting from /public

// roots definition
app.get("/:username/:lang", (req,res) => {
    var username = req.params.username;
    var lang = req.params.lang;
    var showMsg = true;
    var products = [
        {nameprod: "Product1", price: 1.5},
        {nameprod: "Product2", price: 3.0},
        {nameprod: "Product3", price: 11.5},
        {nameprod: "Product4", price: 8.0},
        {nameprod: "Product5", price: 9.0}
    ];
    
    res.render("index.ejs",{
        username: username,
        lang: lang,
        company: "ACME",
        signatures: 8000,
        msg: showMsg,
        products: products
    });
});
/* app.get("/mainpage", (req, res) => {
    //res.send("Welcome to site!");
    res.render("main/mainpage");
});
 */
app.listen(8080,()=> {
    console.log("App running!");
});
