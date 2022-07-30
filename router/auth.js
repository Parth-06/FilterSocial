const express = require('express');
const router = express.Router();
require("../DB/conn")
const authenticate = require("../Middleware/Authenticate")
const cookieParser =require("cookie-parser");
router.use(cookieParser()); 
const Pusher = require("pusher");
const mongoose = require ('mongoose');


const pusher = new Pusher({
  appId: "1438334",
  key: "bfad7d924b358ce37229",
  secret: "63d22981fbe1282bb02a",
  cluster: "ap2",
  useTLS: true
});
const db= mongoose.connection;
db.once("open", ()=>{
  const msgCollection = db.collection("alltweets");
  const changeStream = msgCollection.watch(); 

  changeStream.on('change', (change)=>{
      
   
    if(change.operationType === "insert"){
      const messageDetails = change.fullDocument;
      pusher.trigger("maintweets", "inserted",
      {
        id : messageDetails.id,
        tweet : messageDetails.tweet,
        email : messageDetails.email,
        name : messageDetails.name,
        hdata: messageDetails.hdata
      });
   }else if(change.operationType === "update"){
    const messageDetails = change.fullDocument;
    pusher.trigger("likeupdter", "updated",
    {
      hdata: messageDetails
    });
  }else if(change.operationType === "delete"){
    const messageDetails = change.fullDocument;
    pusher.trigger("deletedata", "deleted",
    {
      _id: messageDetails
    });
   }else{
    console.log("Error Pushing");
   }


})})

const dbn= mongoose.connection;
dbn.once("open", ()=>{
  const msgCollection = db.collection("registers");
  const changeStream = msgCollection.watch(); 

  changeStream.on('change', (change)=>{
      
    // console.log("A change occured", change);
    if(change.operationType === "update"){
      const followingDetails = change.fullDocument;
      pusher.trigger("updatingFollow", "updated",
      {
        following : followingDetails,
      
      });
 
   }else{
    console.log("Error Pushing");
   }
})})

router.get ('/home', authenticate, async (req,res)=> {
  return res.json(req.rootUser)
})



module.exports = router;
