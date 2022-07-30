import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./Connect.css"
import Connectcompo from './Connectcompo';

const Connect = () => {
  const navigate= useNavigate();
  return (
    <div className='connect_home_main'>
    <div className="connect_header">
    <h1 style={{cursor:"pointer"}}><i onClick={()=>navigate("/")} className="fas fa-arrow-left"></i>Connect</h1>
    </div>
    <div className="connectcompo">
    <Connectcompo/>
    </div>
 
    </div>
  )
}

export default Connect