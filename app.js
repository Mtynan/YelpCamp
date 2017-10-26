const express  = require("express");
const app      = express();
const mongoose = require("mongoose");


app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("index")
})



app.listen("3000", function(req, res){
    console.log("Running on Port 3000");
});