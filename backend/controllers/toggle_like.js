const Blog = require("../mongoDB/blog");
const {jwtDecode} = require('jwt-decode')
const toggle_like = async (req,res)=>{
    try{
        const id = req.query.id;
        const author_id = jwtDecode(req.cookies.jwt).id;
        const blog = await Blog.findOne({id:id});
        console.log(blog);
        if(!blog){
            return res.status(400).json({message:'blog not found'});
        }
        const index = blog.likes.indexOf(author_id);
        if(index === -1){
            blog.likes.push(author_id);
        }
        else{
            blog.likes.splice(index,1);
        }
        await blog.save();
        return res.status(200).json({message:'success'});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Internal Server Error'});
    }
    
}

module.exports = toggle_like