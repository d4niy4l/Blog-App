
const Blog = require('./../mongoDB/blog');
const pagesize = 6;
const get_all_blogs = async (req,res)=>{
    try{
        const limit = (parseInt(req.query.limit) || pagesize);
        const offset = parseInt(req.query.offset) || 0;
        const blogs = await Blog.find({});
        blogs.reverse();
        const size = blogs.length;
        const end = Math.min(offset + limit, size);
        const sliced_blogs = blogs.slice(offset, end);
        res.json({items: sliced_blogs,end:end,size:size}); 
    }
    catch(err){
        console.log('error: ',err);
        res.status(500).json({status:false});
    }
}
module.exports = get_all_blogs;