import React from 'react'
import "./EditProfile.css"
const EditProfile = () => {
  return (
    <>
  <div className='EditProfile'>

</div>
    
        <div className="EditProfile_box">
          <div className="edit_header">
          <i className="fas fa-times"></i>
          <h2>Edit Profile</h2>
          <button className='save_button'>Save</button>
          </div>
          <div className="profile_pic"></div>
          <div className="profie_update">
          <div>
   
    <form className='regi_form' method='POST'>
        <div className="regi_in">
        <input type="text" placeholder="Name" className='regi_input_profile' name="name"   autoComplete="off"/>
        </div>
        <div className="regi_in">
        <input type="text" placeholder="Bio"  className='regi_input_profile' name="Bio"autoComplete="off"/>
        </div>
        <div className="regi_in">
        <input type="text" placeholder="Location"  className='regi_input_profile' name="Location"autoComplete="off"/>
        </div>
   
        </form>
</div>
          </div>
       </div>
     
       </>
  )
}

export default EditProfile