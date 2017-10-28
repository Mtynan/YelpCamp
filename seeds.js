const mongoose   = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
    {
      name: "Campsite 1", 
      image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    
    },
    {
        name: "Campsite 2", 
        image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      
      },
      {
        name: "Campsite 3", 
        image:"https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      
      }
]

function seedDB() {
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        }
        console.log("removed Campgrounds")
        //add new campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    consle.log(err)
                } else {
                    console.log("added a campground")
                    //create a comment
                    Comment.create({
                        text:"test text",
                        author:"test author"
                        
                    },function(err, comment){
                        if(err){
                            console.log(err)
                        } else { 
                            campground.comments.push(comment)
                            campground.save();
                            console.log("created comment")
                        }
                    }
                )
                }
            });
        });
     });
};

module.exports= seedDB;