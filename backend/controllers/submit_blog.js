const Blog = require('./../mongoDB/blog');
const User = require('./../mongoDB/users');
const { v4: UUIDV4 } = require('uuid');
const SubmitBlog = async(req,res)=>{
    try{
        const{title,author,body} = req.body;
        if(body.length < 200 || title.length < 3) return res.status(400).json({message: 'Input Error'});
        const user = await User.find({username: author});
        if(!user.length) return res.status(400).json({message: 'Input Error'});
        const blog = new Blog({
            id: UUIDV4(),
            author: author,
            body: body,
            DatePublished: new Date(),
            title: title,
            comments: []
        })
        await blog.save();
        res.status(200).json({message: 'Blog posted successfully'})
    }
    catch(err){
        res.status(500).json({message: 'Server Error'})
    }
}
module.exports = SubmitBlog;