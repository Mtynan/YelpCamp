const express    = require("express");
const router     = express.Router();
const Campground = require("../models/campground");
const Comment = require("../models/comment");

router.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {campground: foundCampground})
        }
    });
});

module.exports = router;