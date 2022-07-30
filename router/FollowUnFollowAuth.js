const express = require('express');
const router = express.Router();
require("../DB/conn")
const User = require("../Model/userShema")
const authenticate = require("../Middleware/Authenticate")
const cookieParser =require("cookie-parser");
router.use(cookieParser()); 


router.get ('/connect', authenticate, async (req,res)=> {
   
    try{
        
        const listOne = await User.find()
 
        if(listOne){
          return res.json(listOne)
        }else(
            console.log(Error)
        )
    }catch(err){
        console.log(err)
    }
  })


 


  router.post ('/follow', authenticate, async (req,res)=> {
    const {fusername} = req.body;
    try{
        const userNew =  await User.findOneAndUpdate({username : fusername},{
          $push:
          { 
            followers: req.rootUser.username       
          }    
          })
          
          const userNeww =  await User.findOneAndUpdate({username : req.rootUser.username },{
            $push:
            { 
              following : fusername       
            }    
            })
           
            res.status(210).json({message: "Followed"})
    }catch(err){
      console.log(err)
          }
  })

  router.post ('/unfollow', authenticate, async (req,res)=> {
    const {unfusername} = req.body;
    try{
        const userNew =  await User.findOneAndUpdate({username : unfusername},{
          $pull:
          { 
            followers : req.rootUser.username       
          }    
          })
          // console.log(userNew);
          const userNeww =  await User.findOneAndUpdate({username : req.rootUser.username },{
            $pull:
            { 
              following : unfusername     
            }    
            })
            // console.log(userNew);
            res.status(210).json({message: "unFollowed"})
    }catch(err){
      console.log(err)
          }
  })

module.exports = router;