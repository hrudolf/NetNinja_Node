const mongoose = require('mongoose');
const Schema = mongoose.Schema; //Schema: constructor function

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true }); //optional, "created at", etc properties automatically!

//Schema defines structure of documents, Model is the thing that surrounds that and provides with an interface by which to communicate with a DB Collection from that document type
//NAME is IMPORTANT -> will look for !!! Blogs !!! if name is Blog
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;