import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import './Home.css';
import 'react-toastify/dist/ReactToastify.css';
import TextComponent from './TextComponent';
import TweetComponent from './TweetComponent';
import { toast } from 'react-toastify';
import MobileTweetCompo from './MobileTweetCompo';
import MobileHeader from '../Header/MobileHeader';
const Home = () => {
  const [userDetails, setUserDetails] = useState([""]);
  const [ sidebar, setSidebar] = useState(false);
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
    <div className='home_main' id='home_main'>
    <div className="home_header">
    <h1 onClick={()=>navigate("/")} style={{cursor:"pointer"}}>Home</h1>
    </div>
    <div className="mobile_header">
    <img src={userDetails.profilepicimage} className="mobile_avatar" alt='' onClick={()=>{setSidebar(true)}} style={{objectFit:"cover"}}/>
    {
       sidebar && 
       <>
       <div className="close_sidebar" onClick={()=>{setSidebar(false)}}></div>
       <div className="mainsidebar">
        <MobileHeader/>
       </div>
       </>
    }
    <div className='mobile_logo'>
    {/* <h3>FilterSocial</h3> */}
    <h3>Filter</h3><h3 style={{color:"orange"}}>Social</h3>
    </div>
   <div className="tweet_logo">
   <i className="fas fa-plus" onClick={()=>navigate("/post")}></i>
   </div>
    </div>
    <TextComponent/>
    <MobileTweetCompo/> 
    <TweetComponent/>
    </div>
  )
}

export default Home