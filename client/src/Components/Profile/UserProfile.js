import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './Profile.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Pusher from "pusher-js"
import Spinner from '../Spinner';


const UserProfile = () => {
  const [userDetails, setUserDetails] = useState([]);
  const navigate= useNavigate();
  const [newData, setnewData] = useState([]);
  const [tweetdata, setTweetdata] = useState([])
  const [userProfileDetails, setUserProfileDetails] = useState([]);
  const {username} = useParams()
 
 
  let alldata = tweetdata;
 if(tweetdata){
   alldata = alldata.filter(
    (items) => items.email === userProfileDetails.email
   )
 
 }
 let newtweetdata = alldata
 
useEffect(() => {
  const Callmainpage = async () => {
   
    try {
        const res = await fetch("/home", {
            method: "GET",
            headers: {

                "Content-Type": "application/json",
                Accept: "application/json"
            },
            credentials: "include"
        });
        const user =  await res.json();
        setUserDetails(user)
        
        //  logoutdispatch({type:"USER", payload:true})
        if (!res.status === 200) {
            const error = new Error(res.error);
            throw error;
            
        }
    } catch (err) {
        console.log(err);
        toast.error("Please Login For Better Experience")
        navigate("/signin");      
    }
}
  Callmainpage()
},[newData]);


useEffect(()=>{
    
  const pusher = new Pusher('bfad7d924b358ce37229', {
    cluster: 'ap2'
  });

  const channel = pusher.subscribe('maintweets');
  channel.bind('inserted', (data) =>{
    if(data){
      console.log(data);
      setnewData(data)
    }
  
  })

  const channelmain = pusher.subscribe('likeupdter');
  channelmain.bind('updated', (dataa) =>{
    if(dataa){
      // console.log(dataa);
      setnewData(dataa)
    }

  })

  const channelfollow = pusher.subscribe('updatingFollow');
  channelfollow.bind('updated', (followData) =>{
    if(followData){
      setnewData(followData)
    }

  })
  
},[])


useEffect(()=>{
  const FetchProfile =async () =>{ 

      const res = await fetch(`/userProfile/${username}`,{
        method: "GET",
        headers:{
          "Content-Type" : "application/json"
        },
      });
    
      const data = await res.json();
      setUserProfileDetails(data.user)
    }
    FetchProfile();

},[newData])

  const LikeData = async(item_id) =>{
  
   await fetch('/likevalue',{
          method: "POST",
          headers:{
            "Content-Type" : "application/json"
          },
      
          body:JSON.stringify({
            item_id
          })
        });

}

useEffect(()=>{
  const Fetchtweet =async () =>{ 

      const res = await fetch('/userprofiletweets',{
        method: "GET",
        headers:{
          "Content-Type" : "application/json"
        },
      });
    
      const data = await res.json();
    
   setTweetdata(data)
 

    }
    Fetchtweet();

},[newData])


const unLikeData = async(item_id) =>{

await fetch('/unlikevalue',{
    method: "POST",
    headers:{
      "Content-Type" : "application/json"
    },

    body:JSON.stringify({
      item_id
    })
  });

}

const followuser = async() =>{
  const res = await fetch('/follow',{
    method: "POST",
    headers:{
      "Content-Type" : "application/json"
    },

    body:JSON.stringify({
      fusername: username
    })
    
  });
  const data = await res.json();
  if (res.status === 422 || !data){
    console.log("invalid")
  }else{
    toast.success("Followed")
    
  } 
}


const unfollowuser = async() =>{
  const res = await fetch('/unfollow',{
    method: "POST",
    headers:{
      "Content-Type" : "application/json"
    },

    body:JSON.stringify({
      unfusername: username
    })
    
  });
  const data = await res.json();
  if (res.status === 422 || !data){
    console.log("invalid")
  }else{
    toast.error("unFollowed")
    
  } 
}
const removebookmarkData = async(item_id) =>{

  const res = await fetch('/removebookmarks',{
          method: "POST",
          headers:{
            "Content-Type" : "application/json"
          },
      
          body:JSON.stringify({
            item_id
          })
        });
        var data = await res.json();
        setnewData(data)
  
  }

const bookmarkData = async(item_id) =>{
  
const res = await fetch('/bookmarks',{
        method: "POST",
        headers:{
          "Content-Type" : "application/json"
        },
    
        body:JSON.stringify({
          item_id
        })
      });
      var data = await res.json();
      setnewData(data)

}


  return (
    <>
    
    { userDetails.bookmark ===  undefined && userDetails.following === undefined? 
    <div className='userspinnerstyle'> 
      <Spinner/>
    </div>
    :
    <div className='profile_main' id='profile_main'>
    <div className="profile_header">
         <h1><i onClick={()=>navigate("/")}className="fas fa-arrow-left"></i>{userProfileDetails.name}</h1>
       </div>
       <div className="profile_sec">
         <div className="cover_image"></div>
         <div>
         <img src={userProfileDetails.profilepicimage} className="profile_image" alt="" style={{objectFit:"cover"}}/>
         </div>
         <div className="bio_sec">
           <div className="name_sec"><h1>{userProfileDetails.name}</h1>
           <p>@{userProfileDetails.username}</p>
           </div>
          
           {
            userDetails.following.includes(username) ?
            <button className='profile_button' onClick={()=>unfollowuser()}>Unfollow</button>
            :
            <button className='profile_button' onClick={()=>followuser()}>Follow</button>
        
           }
         
           
         </div>
         <div className="profile_details">
        
              <div className="all_profdetails">
             {
              userProfileDetails.Bio === "" ?
              <p className='bio_details' style={{display:"none"}}>{userProfileDetails.Bio}</p>
              :
              <p className='bio_details'>{userProfileDetails.Bio}</p>
             }
           {
            userProfileDetails.Location === "" ?
            <p style={{display:"none"}}><i className="fas fa-map-marker-alt"></i>{userProfileDetails.Location}</p> 
            :
            <p style={{marginBottom:"0.5rem"}}><i className="fas fa-map-marker-alt"></i>{userProfileDetails.Location}</p> 
           }
        
           </div>
           <div className="followers">
          
              
         {       userProfileDetails.followers === undefined ?
                (<>0 <p onClick={()=>navigate("/userfollowers", {state:{data: username }})}>Followers</p></>):
                (<>{userProfileDetails.followers.length} <p onClick={()=>navigate("/userfollowers", {state:{data: username }})}>Followers</p></>)}
              
                
               { userProfileDetails.following === undefined ?
                (<>0 <p onClick={()=>navigate("/userfollowing", {state:{data: username }})}>Following</p></>):
                (<>{userProfileDetails.following.length} <p onClick={()=>navigate("/userfollowing", {state:{data: username }})}>Following</p></>)}
                 {/* navigate("/profileupdate", {state:{data:username }})
   */}
           </div>
         </div>
       </div>
       <div className="tweets">
       {
           
           newtweetdata.slice(0).reverse().map((item)=>{
             return(
               <div className="all_tweets" key={item.id}>
       
               <div className="text_tweets">
              
               <img src={userProfileDetails.profilepicimage} className="avatar" alt="" style={{objectFit:"cover"}}/>
               <div className="tweet_area">
                 <div className="user_name"><h3>{userProfileDetails.name}</h3></div>
                 <div className="main_tweet">
                 {item.image === ""
              ?
              <p>{item.tweet}</p>
              :(item.tweet === "")?
              <>
              <div className="tweet_image">
              <img src={item.image} alt=""/>
              </div></>
              :
              <><p>{item.tweet}</p>
              <div className="tweet_image">
              <img src={item.image} alt=""/>
              </div></>
              }
                  </div>
                 <div className="tweet_icons">
             
                    { 
                      item.hdata.includes(userDetails.email)
                     ?
                    ( <><i className="fas fa-heart" style={{color:"rgb(249, 24, 128)"}} onClick={()=>unLikeData(item.id)}></i></>)
                  :
                ( <><i className="far fa-heart"  onClick={()=>LikeData(item.id)}></i></>)
                 
                           
                   }
                  
                   {
                     item.hdata.length>0 ?
                     <p className='Like_number'>{item.hdata.length}</p>
                     :
                     <p className='Like_number' style={{color: "black"}}>{item.hdata.length}</p>
                   }
            
                 
                 {
                userDetails.bookmark.includes(item.id) ?
                <i className="fas fa-bookmark" onClick={()=>removebookmarkData(item.id)}></i>
                :
                <i className="far fa-bookmark" onClick={()=>bookmarkData(item.id)}></i>
            }
      
                 </div>
               </div>
              
               </div>
             
             </div>
             )
           })
    
         }
     
       </div>
       </div>
    }

   
   
    
    </>
  )
}

export default UserProfile