import React, {  useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Bookmarks.css"
import TweetsCompo from './TweetsCompo';
const Bookmarks = () => {
const navigate = useNavigate()

  return (
    <div className='bookmark_main' id='profile_main'>
         <div className="bookmark_header">
    <h1 style={{cursor:"pointer"}}><i onClick={()=>navigate("/")} className="fas fa-arrow-left"></i>Bookmarks</h1>
    </div>
   <TweetsCompo/>
    </div>
  )
}

export default Bookmarks