
const Blog = require('./../mongoDB/blog');
const get_all_blogs = async (req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit; 
        const endIndex = page * limit;
        const size = await Blog.countDocuments();
        const blogs = await Blog.find().limit(limit).skip(startIndex);
        pagination = {};
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit: limit
            };
        }
        if (endIndex < size) {
            pagination.next = {
                page: page + 1,
                limit: limit
            };
        }
        return res.status(200).json ({
            size: size,
            items: blogs,
            current_page: page,
            pagination: pagination
        });
    }
    catch(err){
        console.log('error: ',err);
        res.status(500).json({status:false});
    }
}
module.exports = get_all_blogs;