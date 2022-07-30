import React, { useState } from 'react'
import "./LoginRegi.css"
import Login from '../Login/Login';
import Register from '../Register/Register';

const LoginRegi = () => {
    const [ loginPopup, setloginPopup] = useState(false);
    const [ regiPopup, setregiPopup] = useState(false);
  return (
    <div className='LoginRegiMain'>
   <div className="bg"></div>
   <div className="rightbg">
    <div className="rightbg_header">
    <h1>Filter</h1><h1 style={{color:"orange"}}>Social</h1>
    </div>
    <div className="social_heading">
        <h1>Socialize&nbsp;</h1><h1 style={{color:"orange"}}>Now</h1>
    </div>
    <div className="joinnow">
        <div className="joinnow_header">
        <h1>Join </h1> <h1>&nbsp;Filter</h1><h1 style={{color:"orange"}}>Social</h1> <h1>&nbsp;today.</h1>
        </div>
        <button className='signupbtn'  onClick={()=>{setregiPopup(!regiPopup)}}>Sign up with email</button>
         {
            regiPopup && 
            <>
             <div className='EditProfile' onClick={()=>{setregiPopup(false)}}></div>
             <div className="loginregi_box">
            <i className="fas fa-times" onClick={()=>{setregiPopup(false)}}></i>
            <Register/>
            </div>
            </>
         }
 
        <div className="loginnow">
            <h3>Already have an account?</h3>
            <button className='signupbtn' onClick={()=>{setloginPopup(!loginPopup)}}>Sign in</button>
        {
           loginPopup && 
           <>
            <div className='EditProfile' onClick={()=>{setloginPopup(false)}}></div>
            <div className="loginregi_box">
            <i className="fas fa-times" onClick={()=>{setloginPopup(false)}}></i>
                <Login/>
            </div>
           </> 
        }

           
        </div>
    </div>
   </div>
    </div>
  )
}

export default LoginRegi