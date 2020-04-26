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

//sunday routes

app.get("/api/all", function(req, res) {

    db.Article.find({$query: {saved: false} }).sort( { date: -1 })
    .then( function(response) {
        res.json(response.length)
        // res.json(response)
    })

});

app.get("/api/notes/all", function(req, res) {

    db.Note.find({})
    .then( function(response) {
        res.json(response)
        // res.json(response)
    })
});

   // delete
   app.delete("/api/reduce", function(req, res) {

    db.Article.find({$query: {saved: false} }).sort( { date: -1 })
    .then( function(found) {

        console.log(found.length);
        let countLength = found.length;
        let overflow = countLength - 25;
        console.log(overflow)
        let overflowArray = [];

        for (var i = 0; i < (overflow); i ++) {
            overflowArray.push(found[25+i]._id);
            console.log(overflowArray)
        }

        db.Article.remove({_id: {$in: overflowArray}}, function(error, result) {

            result["length"] = countLength;
            console.log(result)
            res.json(result)

        })

    });

})

app.put("/api/save/article/:id", function(req, res) {
    let articleId = req.params.id;

    db.Article.findOneAndUpdate(
        {_id: articleId},
        {
            $set: {saved: true}
        }
    ).then(function(result) {
        res.json(result)
    })
});


app.put("/api/delete/article/:id", function(req, res) {
    let articleId = req.params.id;

    db.Article.findOneAndUpdate(
        {_id: articleId},
        {
            $set: {saved: false}
        }
    ).then(function(result) {
        res.json(result)
    })
});

app.get("/api/notes/:id", function(req, res) {
    let articleId = req.params.id;

    db.Article.findOne(
        {_id: articleId}
    )
    .populate("note")
    .then(function(result) {
        res.json(result)
    })
});

app.post("/api/create/notes/:id", function(req, res) {
    console.log(req.body);

    db.Note.create(req.body)
    .then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        res.json(err);
    });

});

// delete Headline documents manually if needed
app.get("/api/clear", function(req, res) {

    db.Article.remove()
    .then(function() {
        res.json("documents removed from headline collection")
    })

});

// delete Note
app.delete("/api/delete/notes/:id", function(req, res) {

    db.Note.remove(
        {_id: req.params.id}
    )
    .then(function(result) {
        res.json(result)
    })

});





























    app.get("/articles", function(req, res) {
        // Grab every document in the Articles collection
        db.Article.find({})
          .then(function(dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });
      });

app.post("/scrape", (req, res) => {
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

// app.post("/api/scrape", function(req, res) {

//     axios.get("http://www.npr.org/sections/news/").then(function(response) {

//         const $ = cheerio.load(response.data);

//         console.log($("article.item").length)

//         $("article.item").each(function(i, element) {


//             let headline = $(element).find('.item-info').find('.title').find('a').text();
//             let summary = $(element).find('.item-info').find('.teaser').find('a').text();
//             let link = $(element).find('.item-info').find('.title').children().attr("href");
//             let photo = $(element).find('.item-image').find('.imagewrap').find('a').find('img').attr("src");
//             let date = $(element).find('.item-info').find('.teaser').find('a').find('time').attr("datetime");

//             let headlineObject = {
//                 headline: headline,
//                 summary: summary, 
//                 link: link,
//                 photo: photo,
//                 date: date
//             }

//             db.Article.create(headlineObject, function(error) {
//                 if (error) console.log("Article already exists: " + headlineObject.headline)
//                 else {
//                     console.log("New article: " + headlineObject.headline);
//                 }

//                 if (i == ($("article.item").length - 1)) {
//                     res.json("scrape complete")
//                 }
//             })

//         });

//     })
// });



};
module.exports = apiRoutes;