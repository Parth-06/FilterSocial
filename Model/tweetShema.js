
const mongoose = require('mongoose');

const tweetShema = new mongoose.Schema({
   
id:{
  type: String,
  required: true
},
tweet:{
  type: String,
 
},
email:{
  type: String,
  required: true
},
username:{
  type: String,
  required: true
},
name:{
  type: String,
  required: true
},
image:{
  type: String,
},

hdata:{
 type:Array
},
    profilepicimage:{
      type: String,
    }

  })

const tweetlist = mongoose.model('alltweets',  tweetShema)

module.exports = tweetlist;