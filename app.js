const express = require('express');
const morgan = require('morgan');

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public')); //LOOK IN THE PUBLIC FOLDER FOR STATIC FILES
app.use(morgan('dev'));

//listen for requests -> BELOOOOOW

app.get('/', (req, res) => {
    const blogs = [
        {title: "Rogues do it from behind", snippet: "Cheap shot, backstab, backstab, kidney shot, backstab, backstab, eviscerate"},
        {title: "Warlock is a mushroom class", snippet: "Fear resistance increased for all classes by 95%"},
        {title: "Warrior buff nerfed", snippet: "500 hps trinket nerfed to 495 hps."},
    ];

    //res.send('<p>home page</p>')
    res.render('index', {title: 'Home', blogs}); //vagy: blogs: blogs
})

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>')
    res.render('about', {title: 'About'});
})

app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new blog'});
})

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})


//listen for requests
app.listen(3000, () => console.log("listening on port 3000"));