var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ArticleSchema = new Schema({
    Headline: {
        type: String,
        required: true
    },
    Summary: {
        type: String
    },
    URL: {
        type: String,
        required: true
    }
});
var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;