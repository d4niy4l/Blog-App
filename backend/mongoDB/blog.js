const mongoose = require('mongoose');
const Comment = require('./comments');

const blogSchema = mongoose.Schema({
    author: String,
    title: String,
    body: String,
    DatePublished: Date, 
    comments: [Comment.schema]
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
