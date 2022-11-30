const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://new-user-007:W6lqeY9jYN3LguQF@cluster0.hfxn1g6.mongodb.net/dummy-website?retryWrites=true&w=majority'
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
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog2',
        snippet: 'about my new blog2',
        body: 'more about my new blog2'
    }); //create a new instance of the Blog document

    blog.save() //mongoose saves into the Blog collection
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/single-blog', (req, res) => {
    Blog.findById("63878fadf2a9738086431533")
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

//listen for requests -> BELOOOOOW

app.get('/', (req, res) => {
    const blogs = [
        { title: "Rogues do it from behind", snippet: "Cheap shot, backstab, backstab, kidney shot, backstab, backstab, eviscerate" },
        { title: "Warlock is a mushroom class", snippet: "Fear resistance increased for all classes by 95%" },
        { title: "Warrior buff nerfed", snippet: "500 hps trinket nerfed to 495 hps." },
    ];

    //res.send('<p>home page</p>')
    res.render('index', { title: 'Home', blogs }); //vagy: blogs: blogs
})

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>')
    res.render('about', { title: 'About' });
})

app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
})

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})