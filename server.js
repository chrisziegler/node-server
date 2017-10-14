const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//server logging
app.use((req, res, next) => {
    //toString method creates a nicely formatted time stamp
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.')
        }
    })
    next();
}); 
//maintenance mode blocks routing and static directory from access
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));
//set-up handler for http get request,our url is root of app
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeText: 'Welcome to my webserver'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'GitHub Projects',
        welcomeText: 'A list of my projects surrently available on GitHub'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: '404 - The page you requested does not exist'
    });
});
//listen on port 3000 (or heroku dynamically generated no.)
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});


