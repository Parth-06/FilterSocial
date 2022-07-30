
const mongoose = require('mongoose');

const imageShema = new mongoose.Schema({
   

email:{  
  type: String,
  // required: true
},

image:{
  type: String,
  // required: true
    }})

const imagelist = mongoose.model('allimages',  imageShema)

module.exports = imagelist;