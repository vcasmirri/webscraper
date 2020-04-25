var mongoose = require("mongoose");
var express = requrie("express");
var bodyParser = require("body-parser");
var logger = require("morgan");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

var MONGODB_URI = "mongodb://localhost/mongoHeadlines";

// Switch to this mongoose variable 
// var MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  