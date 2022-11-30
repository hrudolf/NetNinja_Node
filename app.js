const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { sortBy } = require('lodash');
const { response } = require('express');

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
app.use(express.urlencoded({extended: true})) //extended true: optional
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

app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1}) //-1: descending order -> newest -> oldest
        .then((result) => { //needs to be passed into index.ejs
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post('/blogs', (req, res) => {
    //middleware needed! URLENCODED
    //console.log(req.body);
    const blog = new Blog(req.body)

    blog.save() //save that to the db whoa
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    Blog.findById(id)
    .then(result => {
        res.render('details', {blog: result, title: 'Blog Details'})
    })
    .catch(err => {
        console.log(err)});
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
})

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})