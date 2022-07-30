const express = require('express');
const router = express.Router();
require("../DB/conn")
const User = require("../Model/userShema")
const authenticate = require("../Middleware/Authenticate")
const cookieParser =require("cookie-parser");
router.use(cookieParser()); 
const tweetlist = require('../Model/tweetShema');

  router.post ('/updateprofilepic',authenticate, async (req,res)=> {
    const { name, bio, location, url} = req.body;
    const listOne = await User.find ({ username : req.rootUser.username})
    if(listOne){
      try{
        const userNew =  await User.findOneAndUpdate({username :req.rootUser.username},{
            profilepicimage : url,
            name: name,
            Bio: bio,
            Location: location
          })
  
          const userNeww =  await tweetlist.updateMany({username :req.rootUser.username},{
            profilepicimage : url,
            name: name     
          })
    
       res.status(210).json({message: "Registration Success"})
    }catch(err){
      console.log(err)
          }
    }else{
      console.log("notfound");
    }  
  })
  
  router.post ('/updateprofilepicinitial', async (req,res)=> {
    const {   bio, location, url, username } = req.body;
    console.log(username)
    const listOne = await User.find ({ username : username})
    if(listOne){
      try{
        const userNew =  await User.findOneAndUpdate({username : username},{
            profilepicimage : url,
            Bio : bio,
            Location: location   
          })
  
    
       res.status(210).json({message: "Registration Success"})
    }catch(err){
      console.log(err)
          }
    }else{
      console.log("notfound");
    }
  })
  


router.post ('/deletedata', authenticate, async (req,res)=> {
    const { item_id } = req.body;
  
    try{
    
                const userNew =  await tweetlist.findOneAndDelete({id : item_id})
                res.status(210).json({message: "DELETE Success"})
                
    }catch(err){
      console.log(err)
          }
    
  
  })

module.exports = router;