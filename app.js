const express        = require("express");
const app            = express();
const mongoose       = require("mongoose");
const Campground     = require("./models/campground");
const seedDB         = require("./seeds");
const bodyParser     = require("body-parser");
const methodOverride = require("method-override");
const passport       = require("passport");
const LocalStrategy  = require("passport-local");
const User           = require("./models/user");
const flash          = require("connect-flash");

const campgroundRoutes = require("./routes/campgrounds");
const commentRoutes = require("./routes/comments");
const indexRoutes = require("./routes/index");


app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/yelp_campp",  {useMongoClient: true});
app.use(express.static(__dirname + "/public"));
app.use(flash());


//PASSPORT CONFIG
app.use(require("express-session")({
    secret:"secretstuff",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function(){
    console.log("running on port 3000");
});