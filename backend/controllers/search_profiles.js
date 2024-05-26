const User = require('./../mongoDB/users');
const {log} = require('console')
const search_profiles = async (req,res)=>{
    try{
        const query = req.query.query;
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit; 
        const endIndex = page * limit;
        const regex = new RegExp(query, 'i');
        const size = await User.countDocuments();
        const users = await User.find({username: {$regex: regex}}).limit(limit).skip(startIndex);
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
            items: users,
            current_page: page,
            pagination: pagination
        });
    }
    catch(err){
        log(err);
        res.status(500).json({message: 'Internal server error'});
    }
}
module.exports = search_profiles;