
const Blog = require('./../mongoDB/blog');
const pagesize = 5;
const get_all_comments = async (req,res)=>{
    try{
        const limit = (parseInt(req.query.limit) || pagesize);
        const offset = parseInt(req.query.offset) || 0;
        const blog_id = req.query.id;
        const blog = await Blog.findOne({id:blog_id});
        const size = blog.comments.length;
        const end = Math.min(offset + limit, size);
        if(offset == size) return res.json({items: [],end:end}); 
        const comments = blog.comments.slice(offset, end);
        console.log(end,offset);
        res.json({items: comments,end:end}); 
    }
    catch(err){
        console.log('error: ',err);
        res.status(500).json({status:false});
    }
}
module.exports = get_all_comments;