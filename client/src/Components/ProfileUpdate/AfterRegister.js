import React from 'react'
import { useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import "./ProfileUpdate.css"

const AfterRegister = () => {
    const navigate= useNavigate();
  return (
    <>
     <div className='profileupdatemain'>
    <div className='EditProfile' onClick={()=>{navigate("/loginRegi")}}></div>
    <div className="loginregi_box">
    <i className="fas fa-times" onClick={()=>{navigate("/loginRegi")}}></i>
        <Login/>
    </div>
    </div>
    </>
  )
}

export default AfterRegister