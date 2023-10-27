const mongoose = require('mongoose');
const connectDb = url => {
    return mongoose.connect(url).then(()=>console.log('connected')).catch((error)=>console.error('error: ',error));
}
module.exports = connectDb;