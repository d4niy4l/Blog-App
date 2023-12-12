const Blog = require("./../mongoDB/blog");
const addComment = (req,res) =>{
    try{
        const{body,user,title} = req.body;
        const blog = Blog.findOne({username:user,title:title});
        console.log(blog);
    }
    catch(err){
        res.status(500).json({message: 'Internal server error'});
    }
}
module.exports = addComment;