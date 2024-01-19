const Blog = require('./../mongoDB/blog');
const User = require('./../mongoDB/users');
const mongoose = require('mongoose');
const getBlogs = async (req,res)=>{
    try{
        const {author} = req.query;
        user = await User.find({username: author});
        if(user.length === 0) return res.status(404).json({message: 'USER NOT FOUND'});
        const blogs = await Blog.find({author: author});
        blogs.reverse();
        return res.status(200).json({blogs: blogs});
    }
    catch(err){
        console.error('error: ', err);
        return res.status(500).json({message: 'Server Error'});
    }
}
module.exports = getBlogs;