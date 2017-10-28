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

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "secretstuff",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/register", function(req, res){
    res.render("register")
})

app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        })
    })
})


app.get("/login", function(req, res){
    res.render("login");
});


app.post("/login", passport.authenticate("local", 
    {
        successRedirect:"/campgrounds",
        failureRedirect: "/login"
    }), 
    function(req, res){
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds")
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen("3000", function(req, res){
    console.log("Running on Port 3000");
});