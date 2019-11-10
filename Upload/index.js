// main program
// folder \views        -> HTML pages
// folder \uploads      -> where files will be uploaded

// config
const express = require("express");
const app = express();
const multer = require("multer");       // middleware
const path = require("path");           // native from node, used to get the file extension
app.set('view engine', 'ejs');

// file name-type correction
const storage = multer.diskStorage({    // multer function to adjust name-type files
    destination: function(req, file, cb){
        cb(null, "uploads/");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname + Date.now() + path.extname(file.originalname) );
    }
});

// config multer
const upload = multer({storage});

// define routes
// main route
app.get("/", (req,res) => {
    res.render("index");
});

//route to receive files
// upload indicates the name of form field to imput the file
// uploads (plural) will be the folder to receive the files
app.post("/upload", upload.single("file"), (req,res) => {
    res.send("File received");
});

// start server
app.listen(8080, () => {
    console.log("Server running");
});