const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// Connecttion To Database
mongoose.connect('mongodb://localhost/nodekb');
const db = mongoose.connection;

// Check DB Connection
db.once('open', function(){
    console.log('Connected to MongoDB');
});

// Check DB Errors
db.on('error', function(err){
    console.log(err);
});

// Init App
const app = express();
const port = 3000

// Bring In Models
var Article = require('./models/articles');

// Load view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/', function(req, res){
    Article.find({}, function(err, articles){
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title:'Articles',
                articles: articles
            });
        }
    });
});

// Add Route
app.get('/articles/add', function(req, res){
    res.render('add_articles', {
        title:'Add Articles'
    });
});

// Start Server
app.listen(port, function(){
    console.log('Server started on port ' + port);
});