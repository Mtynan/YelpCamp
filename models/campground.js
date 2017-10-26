const mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name: String,
    Image: String,
    Description: String
});


module.exports = mongoose.model("Campground", campgroundSchema);