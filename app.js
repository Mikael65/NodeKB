const express = require('express');
const path = require('path');

// Init App
const app = express();
const port = 3000

// Load view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/', function(req, res){
    var articles = [
        {
            id: 1,
            title: 'Article One',
            author: 'Mikael Bylander',
            body: 'This is article one'
        },
        {
            id: 2,
            title: 'Article Two',
            author: 'Fred Flintstone',
            body: 'This is article two'
        },
        {
            id: 3,
            title: 'Article Three',
            author: 'Barneby',
            body: 'This is article three'
        }
    ];
    res.render('index', {
        title:'Articles',
        articles: articles
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