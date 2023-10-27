const mongoose = require('mongoose');
const blog = mongoose.Schema({
    author: String,
    title: String,
    body: String,
    DatePubllshed: Date
})
const Blog = mongoose.model('Blog',blog);
module.exports = Blog;