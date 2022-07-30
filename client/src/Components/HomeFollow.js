import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Connectcompo from './Connect/Connectcompo';
import "./HomeFollow.css"
const HomeFollow = () => {
const location = useLocation();
 
    if (location.pathname !== "/")
    return null;
  return (
    <div className='HomeFollow'>
        <div className="whofollow">
            <h2>Who to follow</h2>
            <Connectcompo/>
        </div>
        <div className="seemore">
        <Link to="/connect" className="for_link"><p>See More</p></Link>
        </div>
    </div>
  )
}

export default HomeFollow