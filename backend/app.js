const express = require('express');
const app = express();
const connectDB = require('./mongoDB/connect');
const login = require('./routes/login');
const post_blog = require('./routes/blog');
const signup = require('./routes/signup');
const get_one_blog = require('./routes/oneBlog');
const comment = require('./routes/comment');
const cookie_parser = require('cookie-parser');
const verify_user = require('./routes/verify');
const get_all_blogs = require('./routes/all_blogs');
const user_query = require('./routes/user');
require('dotenv').config();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000","*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials
    next();
});
app.use(cookie_parser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 
const startDB  = async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(5000,()=>console.log('au'));
    }
    catch(error){
        console.log(error);
    }
}
startDB();
app.use('/login',login);
app.use('/signup',signup);
app.use('/post-blog',post_blog);
app.use('/oneblog',get_one_blog);
app.use('/comment',comment);
app.use('/verify',verify_user);
app.use('/blogs',get_all_blogs) ;
app.use('/user',user_query);