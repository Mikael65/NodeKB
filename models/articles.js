const mongoose = require('mongoose');

// Article Schema
var articleSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    author:{
        type: String,
        require: true
    },
    body:{
        type: String,
        require: true
    }
});

var Article = module.exports = mongoose.model('Article', articleSchema);