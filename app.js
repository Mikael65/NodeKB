const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

// Body-Parser Middlewear
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

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

// Get Single Article
app.get('/article/:id', function(req, res){
    Article.findById(req.params.id, function(err, article){
        res.render('article', {
            article:article
        });
    });
});

// Add Route
app.get('/articles/add', function(req, res){
    res.render('add_articles', {
        title:'Add Articles'
    });
});

// AddSubmit POST Route
app.post('/articles/add', function(req, res){
    var article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function(err){
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});

// Load Edit Form
app.get('/article/edit/:id', function(req, res){
    Article.findById(req.params.id, function(err, article){
        res.render('edit_article', {
            title:'Edit Article',
            article:article
        });
    });
});

// Update Submit POST Route
app.post('/articles/edit/:id', function(req, res){
    var article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    var query = {_id:req.params.id}

    Article.update(query, article, function(err){
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});

// Delete route
app.delete('/article/:id', function(req, res){
    var query = {_id:req.params.id}

    Article.remove(query, function(err){
        if(err){
            console.log(err);
        }
        res.send('Success');
    });
});

// Start Server
app.listen(port, function(){
    console.log('Server started on port ' + port);
});