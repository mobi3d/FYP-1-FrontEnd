const mongoose=require('mongoose');

const Image = new mongoose.Schema({
    image: String,
    imagePath: String,
    userName: String,
});

const image = mongoose.model("BloodImage", Image);
module.exports = image;