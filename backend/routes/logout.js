const express = require('express');
const router = express.Router();

router.route('/').get(async (req,res)=>{
    try{
        res.clearCookie('jwt');
        res.status(200).json({ message: 'Logout successful' });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
})

module.exports = router;