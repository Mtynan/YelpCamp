const express        = require("express");
const app            = express();
const mongoose       = require("mongoose");
const Campground     = require("./models/campground");
const seedDB         = require("./seeds");
const bodyParser     = require("body-parser");
const methodOverride = require("method-override");

const campgroundRoutes = require("./routes/campgrounds");
const commentRoutes = require("./routes/comments");
const indexRoutes = require("./routes/index");


app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/yelp_campp",  {useMongoClient: true});
app.use(express.static(__dirname + "/public"));

app.use("/campgrounds", campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

//seedDB();



app.listen("3000", function(req, res){
    console.log("Running on Port 3000");
});