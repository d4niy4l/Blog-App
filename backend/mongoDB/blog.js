const mongoose = require('mongoose');


const blogSchema = mongoose.Schema({
    id: String,
    author: String,
    title: String,
    body: String,
    DatePublished: Date, 
    comments: [{body: String, author: String, date: Date}]
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
