const Blog = require('./../mongoDB/blog');
const delete_blog = async (req,res) => {
    try{
        const {id} = req.body;
        const result = await Blog.findOneAndDelete({id: id});
        if(!result) 
            return res.status(404).json({message: 'BLOG NOT FOUND'});
        res.status(200).json({message: 'SUCCESSFULLY DELETED'});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message: 'INTERNAL SERVER ERROR'});
    }
}
module.exports = delete_blog;