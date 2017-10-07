const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error){
            console.log("Unable to append log to the server.log file");
        }
    });
    console.log(log);
    next();
});

/* app.use((req, res, next) => {
    res.render('maintainance.hbs', {
        pageType: "Maintainance Page",
        maintainMsg: "Work in progress. Please try after some time"
    });
}); */

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageType: "Home Page",
        welcomeMsg: "Welcome to my site"
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageType: "About Page"
    });
});

app.get('/project', (req, res) => {
    res.render('project.hbs', {
        pageType: "Project Page"
    });
});

app.listen(port, (err) => {
    console.log(`Server running on port ${port}`);
});