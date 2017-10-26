const express    = require("express");
const app        = express();
const mongoose   = require("mongoose");
const Campground = require("./models/campground");
const seedDB     = require("./seeds");

app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/yelp_campp",  {useMongoClient: true});


seedDB();

app.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds})
        }
    });
});



app.listen("3000", function(req, res){
    console.log("Running on Port 3000");
});