const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    username: String,
    body: String,
    date: Date
});
const Comment = mongoose.model('Comment',commentSchema);
module.exports  = Comment;