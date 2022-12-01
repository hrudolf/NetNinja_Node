const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

//connect to mongodb
const dbURI = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@cluster0.hfxn1g6.mongodb.net/dummy-website?retryWrites=true&w=majority`
mongoose.connect(dbURI)
    .then((result) => app.listen(3000, () => {
        console.log("DB connected");
        console.log("listening on port 3000");
    }))
    .catch(err => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public')); //LOOK IN THE PUBLIC FOLDER FOR STATIC FILES
app.use(express.urlencoded({ extended: true })) //extended true: optional
app.use(morgan('dev')); //logging into node console

app.get('/', (req, res) => {
    res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>')
    res.render('about', { title: 'About' });
})

app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

//blog routes
app.use('/blogs', blogRoutes);

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})