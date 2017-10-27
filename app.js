const express    = require("express");
const app        = express();
const mongoose   = require("mongoose");
const Campground = require("./models/campground");
const seedDB     = require("./seeds");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/yelp_campp",  {useMongoClient: true});


//seedDB();

app.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds})
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new")
})

app.post("/campgrounds", function(req, res){
   Campground.create(req.body.campground, function(err, newCampground){
       if(err){
           console.log(err)
       } else {
           res.redirect("/");
       }
   })
})


app.listen("3000", function(req, res){
    console.log("Running on Port 3000");
});