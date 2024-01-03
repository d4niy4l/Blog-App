const Blog = require("../mongoDB/blog");
const addComment = async(req,res) =>{
    try{
        const{body,user,id} = req.body;
        const blog = await Blog.findOne({id:id});
        if(!blog)
            return res.status(404).json({ error: 'Blog not found' });
        blog.comments.push({body: body, author: user, date: () => new Date});
        await blog.save();
        res.status(200).json({ error: 'COMMENT POSTED' });
    }
    catch(err){
        res.status(500).json({message: 'Internal server error'});
    }
}
module.exports = addComment;