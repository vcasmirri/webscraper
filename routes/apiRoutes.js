// var mongoose = require("mongoose");
// var cheerio = require("cheerio");
// var axios = require("axios");

// function apiRoutes(app) {
    
//     app.get("scrape", (req, res) => {
//         console.log("static text");
//         axios.get("https://www.buzzfeed.com").then(function(response) {
//             var $ = cheerio.load(response.data);
//             $("div.xs-px05").each(function(i, element){
//                 var title = $(this).children("h2").text();
//                 var summary = $(this).children("p").text();
//                 var link = $(this).children("h2").children("a").attr("href");
//                 console.log(title, summary, link);
//             });
//             res.send("Scrape successfully completed.");
//         });
//     });
    
// };

// module.exports = apiRoutes;



var cheerio = require("cheerio");
var axios = require("axios");
var mongoose = require("mongoose");
var db = require("../models");


function apiRoutes(app) {
app.get("/scrape", (req, res) => {
    console.log("static text");
    axios.get("https://www.buzzfeed.com").then(function(response){
        //cheerio will load the get request, data will returns the article web page
        var $ = cheerio.load(response.data);
        $("div.xs-px05").each(function(i, element){

            // create new empty result object
            var result = {};

            // h2 and p are tags that are within the div tag, hence children
            result.headline = $(this).children("h2").text();
            result.summary = $(this).children("p").text();
            //a is the child of h2 is the child of div hence 2 children
            result.link = $(this).children("h2").children("a").attr("href");
            // var photo = $(this).children("img").attr("src");
            console.log(result.headline, result.summary, result.link);
            // var title = $(this).contents();
            // console.log(title);
            // // also try $("div").each

            //create new Aricle using the 'result' object we just scraped together

            db.Article.create(result)
            .then(function(dbArticle) {
              // View the added result in the console
              console.log(dbArticle);
            })
            .catch(function(err) {
              // If an error occurred, log it
              console.log(err);
            });

        });
        res.send("scrape completed!");
    });
});
};
module.exports = apiRoutes;