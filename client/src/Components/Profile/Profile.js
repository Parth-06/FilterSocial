import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import '../Home/Home.css';
import '../EditProfile/EditProfile.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Pusher from "pusher-js"
import Spinner from '../Spinner';


const Profile = () => {
  const navigate= useNavigate();
  const [newData, setnewData] = useState([]);
  const [tweetdata, setTweetdata] = useState([])
  const [userDetails, setUserDetails] = useState([]);
  const [ editPro, setEditPro] = useState(false);
  const [img, setimg]= useState()
  const [imgPre, setimgPre]= useState("")
  const [name, setName]= useState()
  const [bio, setBio]= useState()
  const [locationn, setLocation]= useState()
  let alldata = tweetdata;
 if(tweetdata){
   alldata = alldata.filter(
    (items) => items.email === userDetails.email
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

  const channeldelete = pusher.subscribe('deletedata');
  channeldelete.bind('deleted', (deletedata) =>{
    if(deletedata){
      // console.log(dataa);
      setnewData(deletedata)
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
  const Fetchtweet =async () =>{ 

      const res = await fetch('/alltweets',{
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

  const LikeData = async(item_id) =>{
   
  const res = await fetch('/likevalue',{
          method: "POST",
          headers:{
            "Content-Type" : "application/json"
          },
      
          body:JSON.stringify({
            item_id
          })
        });

}

const unLikeData = async(item_id) =>{

const res = await fetch('/unlikevalue',{
    method: "POST",
    headers:{
      "Content-Type" : "application/json"
    },

    body:JSON.stringify({
      item_id
    })
  });

}

const Delete = async(item_id) =>{
  const res = await fetch('/deletedata',{
    method: "POST",
    headers:{
      "Content-Type" : "application/json"
    },

    body:JSON.stringify({
      item_id
    })
    
  });
  const data = await res.json();
  // setnewData(data)
  if (res.status === 422 || !data){
    console.log("invalid")
  }else{
    toast.error("Deleted")
    
  } 
}



  useEffect(()=>{
    if (img){
      const reader = new FileReader();
      reader.onloadend = () =>{
        setimgPre(reader.result)
      }
      reader.readAsDataURL(img);
    } else{
        setimgPre("")
      }
    
    },[img])

  const profilestateupload = async(event) =>{
    setimg(event.target.files[0])
  }

const proimage = async()=>{
  if(imgPre === ""){
    setEditPro(false)
        
    const res = await fetch('/updateprofileDetails',{
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
  
      body:JSON.stringify({
      name, bio, location: locationn
      })
    })
  }else{
    setEditPro(false)
    const picdata = new FormData();
    picdata.append("file", img)
    picdata.append("upload_preset", "filtersocialimages")
    picdata.append("cloud_name", "filtersocial")
    const res = await fetch("https://api.cloudinary.com/v1_1/filtersocial/image/upload",{
      method: 'POST',
      body: picdata
    })
    const dataaa = await res.json();
    const ress = await fetch('/updateprofilepic',{
    method: "POST",
    headers:{
      "Content-Type" : "application/json"
    },

    body:JSON.stringify({
    name, bio, location: locationn, url: dataaa.secure_url
    })
  })

  }

}

const bookmarkData = async(item_id) =>{
  
const res = await fetch('bookmarks',{
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

  return (
    <>
    {
      userDetails.bookmark === undefined && newtweetdata === undefined &&userDetails.following ?
      <div className='spinnerstyle'> 
      <Spinner/>
    </div>
    :
    <div className='profile_main' id='profile_main'>
    <div className="profile_header">
         <h1><i onClick={()=>navigate("/")} className="fas fa-arrow-left"></i>{userDetails.name}</h1>
       </div>
       <div className="profile_sec">
         <div className="cover_image"></div>
         <div>
           {
             userDetails.profilepicimage === "" || undefined || null ?
             <div className="profile_image"></div>
             :
             <img src={userDetails.profilepicimage} className="profile_image" style={{objectFit:"cover"}} alt=""/>
           }
        
         </div>
         <div className="bio_sec">
           <div className="name_sec"><h1>{userDetails.name}</h1>
           <p>@{userDetails.username}</p>
           </div>
           <button className='profile_button' onClick={()=>{setEditPro(!editPro)}}>Edit Profile</button>
         </div>
         {
           editPro && 
           <>
           <div className='EditProfile' onClick={()=>{setEditPro(false)}}></div>
                 <div className="EditProfile_box">
                   <div className="edit_header">
                   <i className="fas fa-times" onClick={()=>{setEditPro(false)}}></i>
                   <h2>Edit Profile</h2>
                   <button className='save_button' onClick={proimage}>Save</button>
                   </div>
                    
          <label htmlFor="pic_upload">
          <div className="profile_pic_center">
          
              {
             imgPre === "" && userDetails.profilepicimage === "" ?
            <div className="profile_pic" ></div>
             : ( imgPre === "" && userDetails.profilepicimage !== "") ?
             <img src={userDetails.profilepicimage} className="profile_pic" alt=""  style={{objectFit:"cover"}}/>
             :
            <img src={imgPre} className="profile_pic" style={{objectFit:"cover"}} alt=""/> 
           }
          
          </div>
           </label>
        <input type="file" id="pic_upload"  accept="image/png, image/jpg, image/jpeg" onChange={profilestateupload}/>
                   <div className="warning"><p>*To Update Your Profile Click on Save Button</p></div>
                   <div className="profie_update">
                   <div>
            
             <form className='regi_form' method='POST'>
                 <div className="regi_in">
                 <input type="text" placeholder={userDetails.name}className='regi_input_profile' name="name" autoComplete="off"  maxlength="27" onChange={(e)=>setName(e.target.value)}/>
                 </div>
                 <div className="regi_in">
                 <input type="text" placeholder={userDetails.Bio === "" ? "Bio" : userDetails.Bio} className='regi_input_profile' name="Bio"autoComplete="off" maxlength="28" onChange={(e)=>setBio(e.target.value)}/>
                 </div>
                 <div className="regi_in">
                 <input type="text" placeholder={userDetails.Location  === "" ? "Location" : userDetails.Location}  className='regi_input_profile' name="Location" autoComplete="off" maxlength="27" onChange={(e)=>setLocation(e.target.value)}/>
                 </div>
            
                 </form>
         </div>
                   </div>
                </div>
              
                </>
         }
         <div className="profile_details">
           <div className="all_profdetails">
             {
              userDetails.Bio === "" ?
              <p className='bio_details' style={{display:"none"}}>{userDetails.Bio}</p>
              :
              <p className='bio_details'>{userDetails.Bio}</p>
             }
           {
            userDetails.Location === "" ?
            <p style={{display:"none"}}><i className="fas fa-map-marker-alt"></i>{userDetails.Location}</p> 
            :
            <p style={{marginBottom:"0.5rem"}}><i className="fas fa-map-marker-alt"></i>{userDetails.Location}</p> 
           }
        
           </div>
           <div className="followers">
           {       userDetails.followers === undefined ?
                   (<>0 <p>Followers</p></>):
                   (<>{userDetails.followers.length} <p onClick={()=>navigate("/followers")}>Followers</p></>)}
                 
                 
                 
                  { userDetails.following === undefined ?
                   (<>0 <p>Following</p></>):
                   (<>{userDetails.following.length}  <p onClick={()=>navigate("/following")}>Following</p></>)}
           </div>
         </div>
       </div>
       <div className="tweets">
       {
           
           newtweetdata.slice(0).reverse().map((item)=>{
             return(
               <div className="all_tweets" key={item.id}>
       
               <div className="text_tweets">
               <img src={userDetails.profilepicimage} className="avatar" alt="" style={{objectFit:"cover"}}/>
               <div className="tweet_area">
                 <div className="user_name"><h3>{item.name}</h3></div>
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
                     item.hdata.length>0?
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
                 <i className="fas fa-trash" onClick={()=>Delete(item.id)}></i>
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

export default Profile