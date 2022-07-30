import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import "./Followers.css"
const Following = () => {
    const navigate= useNavigate();
    const [userdata, setUserdata] = useState([])
    const [userDetails, setUserDetails] = useState([]);
    const [newData, setnewData] = useState([]);
    let alldata = userdata;
    if(userdata){
      alldata = alldata.filter(
       (items) =>  userDetails.following.includes(items.username)
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
            //   toast.error("Please Login For Better Experience")
              navigate("/signin");      
          }
      }
        Callmainpage()
    },[newData]);

    useEffect(()=>{
      const Fetchtweet =async () =>{ 
    
          const res = await fetch('/connect',{
            method: "GET",
            headers:{
              "Content-Type" : "application/json"
            },
          });
        
          const data = await res.json();
         setUserdata(data)
         console.log(data);
        }
        Fetchtweet();
    
    },[newData])

    const followuser = async(username) =>{
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
      setnewData(data)
      console.log(data);
      if (res.status === 422 || !data){
        console.log("invalid")
      }else{
        // toast.success("Followed")
        
      } 
    }
    
    
    const unfollowuser = async(username) =>{
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
      setnewData(data)
      if (res.status === 422 || !data){
        console.log("invalid")
      }else{
        // toast.error("unFollowed")
        
      } 
    }

  return (
    <>
    
    { userDetails.followers === undefined &&  userDetails.following === undefined? 
    <div className='home_main'>
    <div className="home_header">
    <h1 style={{cursor:"pointer"}}><i onClick={()=>navigate("/profile")}className="fas fa-arrow-left"></i>{userDetails.name}</h1>
    </div>
 <div className='followerspinnerstyle'> 
      <Spinner/>
    </div>
    </div>
    :
    <div className='Followers_main'>
    <div className="Followers_header">
    <h1 style={{cursor:"pointer"}}><i onClick={()=>navigate("/profile")}className="fas fa-arrow-left"></i>{userDetails.name}</h1>
    </div>
    <div className="follwers_header">
        <h3  onClick={()=>navigate("/followers")} >Followers</h3>
        <h3 style={{color:"white", fontWeight:"700", borderBottom:"2px solid"}}>Following</h3>
      </div>

      <div>
    {
      newtweetdata.map ((item)=>{
        return(
          <div className="connect_main">
             <Link to={item.username !== userDetails.username ? "/profile/"+item.username : "/profile"}>
         
         <img src={item.profilepicimage} className="avatar" alt='' style={{objectFit:"cover"}}/>
         </Link>
         
          <Link to={item.username !== userDetails.username ? "/profile/"+item.username : "/profile"} className="for_link">
          <div className="username">
              <h3>{item.name}</h3>
              <p>{item.username}</p>
          </div>
          </Link>
     
          <div className="button_connect">
          {
            userDetails.following.includes(item.username) ?
            <button className='profile_button' onClick={()=>unfollowuser(item.username)}>Unfollow</button>
            :
            <button className='profile_button' onClick={()=>followuser(item.username)}>Follow</button>
        
           }
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

export default Following