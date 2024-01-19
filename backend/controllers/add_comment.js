const Blog = require("../mongoDB/blog");
const User =  require("../mongoDB/users");
const addComment = async(req,res) =>{
    try{
        const{body,author_id,id} = req.body;
        const blog = await Blog.findOne({id:id});
        const user = await User.findById(author_id)
        const author = user.username;
        if(!blog) return res.status(404).json({ error: 'Blog not found' });
        blog.comments.unshift({body: body, author: author, date: new Date});
        await blog.save();
        res.status(200).json({ status: true });
    }
    catch(err){
        res.status(500).json({message: 'Internal server error'});
    }
}
module.exports = addComment;