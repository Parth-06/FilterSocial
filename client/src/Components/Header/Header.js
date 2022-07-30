import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TextComponent from '../Home/TextComponent';
import './Header.css';

const Header = () => {
  const location = useLocation();
const navigate = useNavigate();
const [ tweetPopup, setTweetPopup] = useState(false);
    if (location.pathname === "/login")
      return null;
      if (location.pathname === "/register")
      return null;
      if (location.pathname === "/loginRegi")
      return null;
      if (location.pathname === "/profileupdate")
      return null;
      if (location.pathname === "/signin")
      return null;
  return (
    <>
  <nav className='Header'>
    <div className="sec_header">
    <div className="logo" onClick={()=>navigate("/")} style={{cursor:"pointer"}}><h1>FilterSocial</h1></div>
    <ul className='navigation'>
   <Link to="/" className='for_link'><li><i className="fas fa-home" ></i>Home</li></Link>
   <Link to="/profile" className='for_link'><li><i className="far fa-user"></i>Profile</li></Link>
   <Link to="/bookmarks" className='for_link'>  <li><i className="far fa-bookmark" style={{color: "rgb(236, 231, 231)", fontSize:"25px", marginLeft:"0rem"}}></i>Bookmarks</li>
   </Link>
   <Link to="/followers" className='for_link'><li><i className="fas fa-user-plus"></i>Followers</li></Link>
   <Link to="/following" className='for_link'><li><i className="fas fa-user-plus"></i>Following</li></Link>
      <li onClick={()=>navigate("/logout")} ><i className="far fa-times-circle"></i>Logout</li>
    </ul>
    <button className='tweeet_button' onClick={()=>{setTweetPopup(!tweetPopup)}}>Tweet</button>
    {
      tweetPopup && 
      <>
      <div className='EditProfile' onClick={()=>{setTweetPopup(false)}}></div>
      <div className="mainpopup">
      <div className="popup_box">
      <i className="fas fa-times" style={{fontSize:"23px", marginLeft:"1rem", marginBottom:"1rem"}}  onClick={()=>{setTweetPopup(false)}}></i>
        <TextComponent/>
      </div>
      </div>
      </>
    }
    </div>
  </nav>
    </>
  )
}

export default Header