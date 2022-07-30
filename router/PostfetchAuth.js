const express = require('express');
const router = express.Router();
require("../DB/conn")
const User = require("../Model/userShema")
const authenticate = require("../Middleware/Authenticate")
const cookieParser =require("cookie-parser");
router.use(cookieParser()); 
const tweetlist = require('../Model/tweetShema');


router.post ('/alltweetsimage',authenticate, async (req,res)=> {
  const {  t_id, mtweet,url} = req.body;
  try{
 
    const tweets = new tweetlist ({id: t_id, tweet: mtweet, email: req.rootUser.email,username: req.rootUser.username, image: url, name: req.rootUser.name, hdata: [], profilepicimage:req.rootUser.profilepicimage });
    await tweets.save();
    res.status(210).json({message: "Registration Success"})
  
  }catch(err){
      console.log(err)
  }})


router.post ('/alltweets',authenticate, async (req,res)=> {
    const {  t_id, mtweet} = req.body;
    
    try{
   
      const tweets = new tweetlist ({id: t_id, tweet: mtweet,email: req.rootUser.email,username: req.rootUser.username, image: "",name: req.rootUser.name, hdata: [], profilepicimage:req.rootUser.profilepicimage});
      await tweets.save();
      res.status(210).json({message: "Registration Success"})
    
    }catch(err){
        console.log(err)
    }})
  
  
    router.get ('/alltweets', authenticate, async (req,res)=> {
     
      try{
          
          const listOne = await tweetlist.find ({ $or: [
            { username : req.rootUser.username },
            { username: req.rootUser.following}
          ]})
   
          if(listOne){
            return res.json(listOne)
          }else(
              console.log(Error)
          )
      }catch(err){
          console.log(err)
      }
    })
    
    router.post ('/likevalue', authenticate, async (req,res)=> {
      const { item_id} = req.body;
      try{
          const userNew =  await tweetlist.updateOne({id : item_id},{
            $push:
            { 
              hdata : req.rootUser.email 
            
            }   
            })
            res.status(210).json({message: "Registration Success"})
      }catch(err){
        console.log(err)
            }
    })


    router.post ('/unlikevalue', authenticate, async (req,res)=> {
      const { item_id} = req.body;
    
      try{
      
                  const userNew =  await tweetlist.updateOne({id : item_id},{
                    $pull:
                    { 
                      hdata : req.rootUser.email 
                    
                    }   
                    })
                    res.status(210).json({message: "Registration Success"})
      }catch(err){
        console.log(err)
            }
      
    
    })

    router.post ('/bookmarks', authenticate, async (req,res)=> {
      const { item_id} = req.body;
    
      try{
          const userNew =  await User.updateOne({username : req.rootUser.username },{
            $push:
            { 
              bookmark : item_id       
            }    
            })
            res.status(210).json({message: "Registration Success"})
      }catch(err){
        console.log(err)
            }
    })
  
    router.post ('/removebookmarks', authenticate, async (req,res)=> {
      const { item_id} = req.body;
      try{
          const userNew =  await User.updateOne({username : req.rootUser.username },{
            $pull:
            { 
              bookmark : item_id       
            }    
            })
            res.status(210).json({message: "Registration Success"})
      }catch(err){
        console.log(err)
            }
    })
    module.exports = router;