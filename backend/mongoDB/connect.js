const mongoose = require('mongoose');
const connectDb = url => {
    return mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>console.log('database connected')).catch((error)=>console.error('error: ',error));
}
module.exports = connectDb;