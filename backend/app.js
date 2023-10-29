const express = require('express');
const app = express();
const connectDB = require('./mongoDB/connect');
const login = require('./routes/login');
const post_blog = require('./routes/blog');
const signup = require('./routes/signup');
const get_one_blog = require('./routes/oneBlog');
require('dotenv').config();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
});
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
