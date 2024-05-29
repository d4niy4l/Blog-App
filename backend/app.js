const express = require('express');
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
const search_blogs = require('./routes/search_blog');
const search_users = require('./routes/search_users');
const like_toggler = require('./routes/toggle_likes');
const pfp = require('./routes/profilepicture');
const update_bio = require('./routes/update_bio');
const remove_pfp = require('./routes/remove-pfp');
const path = require('path');
const app = express();
require('dotenv').config();

  
  app.use((req, res, next) => {
    const allowedOrigins = ['https://bloggo-five.vercel.app', 'http://localhost:3000']; // Add other allowed origins as needed
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } 
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });
app.use(cookie_parser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 
const startDB  = async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(5000,()=>console.log('server is on'));
    }
    catch(error){
        console.log(error);
    }
}
startDB();
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/login',login);
app.use('/signup',signup);
app.use('/post-blog',post_blog);
app.use('/oneblog',get_one_blog);
app.use('/comment',comment);
app.use('/verify',verify_user);
app.use('/blogs',get_all_blogs) ;
app.use('/user',user_query);
app.use('/search-blogs',search_blogs);
app.use('/search-users',search_users);
app.use('/toggle-like',like_toggler);
app.use('/pfp',pfp);
app.use('/update-bio',update_bio);
app.use('/remove-pfp',remove_pfp);
//upload pfp