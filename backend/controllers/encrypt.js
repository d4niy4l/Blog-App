const bcrypt = require('bcryptjs');
const encrypt = async(password, salt)=>{
    return bcrypt.hash(password, 10);
}
module.exports = {encrypt}