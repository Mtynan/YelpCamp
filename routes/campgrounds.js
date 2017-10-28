const express    = require("express");
const router     = express.Router();
const Campground = require("../models/campground");


//Index - Show all Campgrounds
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds})
        }
    });
});

//NEW - Show form to create new Campground
router.get("/new",isLoggedIn, function(req, res){
    res.render("campgrounds/new")
});


//Create - Add new campground to db
router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image= req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author}
   Campground.create(newCampground, function(err, newCampground){
       if(err){
           console.log(err)
       } else {
           console.log(newCampground)
           res.redirect("/");
       }
   })
})

//Show - Shows more information about one campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds/show", {campground: foundCampground})
        }
    });
});


//Edit - Edit campground
router.get("/:id/edit", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds/edit", {campground: foundCampground})
        }
    });
});

//Update - Update the Campground
router.put("/:id", function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            console.log(err)
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
});


//Delete - Campground
router.delete("/:id", function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err)
        } else {
            res.redirect("/")
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;