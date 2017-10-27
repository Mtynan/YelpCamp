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
router.get("/new", function(req, res){
    res.render("campgrounds/new")
});


//Create - Add new campground to db
router.post("/", function(req, res){
   Campground.create(req.body.campground, function(err, newCampground){
       if(err){
           console.log(err)
       } else {
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

module.exports = router;