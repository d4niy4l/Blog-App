const Blog = require("../mongoDB/blog");
const User =  require("../mongoDB/users");
const {jwtDecode} = require('jwt-decode');
const addComment = async(req,res) =>{
    try{
        const{body,id} = req.body;
        const author_id = jwtDecode(req.cookies.jwt).id;
        console.log(author_id);
        const blog = await Blog.findOne({id:id});
        const user = await User.findById(author_id)
        const author = user.username;
        if(!blog) return res.status(404).json({ error: 'Blog not found' });
        blog.comments.unshift({body: body, author: author, date: new Date});
        await blog.save();
        res.status(200).json({ status: true });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
}
module.exports = addComment;