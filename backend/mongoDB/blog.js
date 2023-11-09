const mongoose = require('mongoose');
const blog = mongoose.Schema({
    author: String,
    title: String,
    body: String,
    DatePubllshed: Date,
    comments: [String]
})
const Blog = mongoose.model('Blog',blog);
module.exports = Blog;