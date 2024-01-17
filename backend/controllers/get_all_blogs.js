
const Blog = require('./../mongoDB/blog');
const pagesize = 10;
const get_all_blogs = (req,res)=>{
    try{
        
    }
    catch(err){
        console.log('error: ',err);
        res.status(500).json({status:false});
    }
}
module.exports = get_all_blogs;