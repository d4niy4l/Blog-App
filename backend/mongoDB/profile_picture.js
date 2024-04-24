const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    fileName: String,
    filePath: String,
    imageUrl: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Image = mongoose.model('Image',imageSchema);

module.exports = Image;
