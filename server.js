// var mongoose = require("mongoose");
// var express = require("express");
// var handlebars = require("express-handlebars");
// // var bodyParser = require("body-parser");
// // var logger = require("morgan");

// // var axios = require("axios");
// // var cheerio = require("cheerio");

// // var db = require("./models");

// var app = express();
// var PORT = 3000;


// // Use morgan logger for logging requests
// // app.use(logger("dev"));
// // Parse request body as JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.engine("handlebars", handlebars({defaultLayout: "main"}));

// app.set("view engine", "handlebars");


// // Make public a static folder
// app.use(express.static("public"));




// var MONGODB_URI = "mongodb://localhost/mongoHeadlines";

// // // Switch to this mongoose variable 
// // // var MONGODB_URI = process.env.MONGODB_URI;

// mongoose.connect(MONGODB_URI);

// var apiRoute = require("./routes/apiRoutes");
// apiRoute(app);

// // Start the server
// app.listen(PORT, function() {
//     console.log("App running on port " + PORT + "!");
//   });












//Dependencies
var express = require("express");
var handlebars = require("express-handlebars");
//Initialize Express
var app = express();
var PORT = 3000;
//Middleware
//the data that you get from the webpage takes the information from the post request and makes the data clean and readable
app.use(express.urlencoded({extended: true}))
//parses the client-side data and converts it to JSON
app.use(express.json())
app.engine("handlebars", handlebars({defaultLayout: "main"}));
//the first argument is the name of the extension, the second argument is where you want to populate/render the whole page 
app.set("view engine", "handlebars");
//static refers to converting the public folder (the local host) into a static route
app.use(express.static("public"));
var apiRoute = require("./routes/apiRoutes");
apiRoute(app);
// Set the app to listen on port 3000
app.listen(PORT, function() {
    console.log("App running on Port 3000!");
  });
// //Deploy to heroku
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// mongoose.connect(MONGODB_URI);