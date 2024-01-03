const Blog = require("./../mongoDB/blog");
const getOneBlog = async(req,res)=>{
    const {id} = req.query; 
    const blog = await Blog.find({id: id});
    if(blog.length === 0)return res.status(404).json({message: 'BLOG NOT FOUND'});
    res.status(200).json({blog: blog[0]});
}
module.exports = getOneBlog;