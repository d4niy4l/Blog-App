const Blog =  require('./../mongoDB/blog');
const delete_all = async (req,res)=>{
    try{
        const { author } = req.body;
        const success = await Blog.deleteMany({author: author});
        if(!success)
            res.status(404).json({message: 'NO BLOGS FOUND UNDER AUTHOR'});
        res.status(200).json({message: 'SUCCESSFULLY DELETED'});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'INTERNAL SERVER ERROR'});
    }
}
module.exports = delete_all;