import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MobileHeader = () => {
    const [userDetails, setUserDetails] = useState([""]);
     const navigate= useNavigate();
    
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
              const user = await res.json();
              setUserDetails(user)
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
      },[]);

  return (
    <>
    <div className="profileinfo">
        {/* <h3>Account Info</h3>    */}
        <div className="prof_details">
        <img src={userDetails.profilepicimage} className="avatar" alt='' onClick={()=>{navigate("/profile")}} style={{objectFit:"cover"}}/>
        <div className="mobile_name_sec"><h1>{userDetails.name}</h1>
           <p>@{userDetails.username}</p>
           </div>
           <div className="mobile_followers">
           {       userDetails.followers === undefined ?
                   (<>0 <p>Followers</p></>):
                   (<>{userDetails.followers.length} <p onClick={()=>navigate("/followers")}>Followers</p></>)}
                 
                 
                 
                  { userDetails.following === undefined ?
                   (<>0 <p>Following</p></>):
                   (<>{userDetails.following.length}  <p onClick={()=>navigate("/following")}>Following</p></>)}
           </div>
        </div>
    </div>
    <div className="phone_header">
    <ul className='navigation'>
   <Link to="/" className='for_link'><li><i className="fas fa-home"></i>Home</li></Link>

   <Link to="/profile" className='for_link'><li><i className="far fa-user"></i>Profile</li></Link>
   <Link to="/bookmarks" className='for_link'>  <li><i className="far fa-bookmark" style={{color: "rgb(236, 231, 231)", fontSize:"25px", marginLeft:"0rem"}}></i>Bookmarks</li>
   </Link>
   <Link to="/followers" className='for_link'><li><i className="fas fa-user-plus"></i>Followers</li></Link>
   <Link to="/following" className='for_link'><li><i className="fas fa-user-plus"></i>Following</li></Link>
   <Link to="/connect" className='for_link'><li><i className="fas fa-link"></i>Connect</li></Link>
      <li onClick={()=>navigate("/logout")} ><i className="far fa-times-circle"></i>Logout</li>
    </ul>
    </div>
    </>
  )
}

export default MobileHeader