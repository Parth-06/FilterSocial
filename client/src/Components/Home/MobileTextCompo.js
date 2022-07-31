import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import TextareaAutosize from 'react-textarea-autosize';
import React, {  useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import './Home.css';

const MobileTextCompo = () => {
    const navigate= useNavigate();
    const [text, settext] = useState("")
    const [tweetArea, settweetArea] = useState([])
    const [userDetails, setUserDetails] = useState([]);
    const [img, setimg]= useState()
    const [imgPre, setimgPre]= useState("")
   

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


      const allheight = (value) =>{
        settext(value)
    }

    
    const addItem = async() => {
      if(imgPre !== ""){  
        const newText = {id: new Date().getTime().toString(), tweet: text, email: userDetails.email, username : userDetails.username ,name: userDetails.name, hdata: [], profilepicimage: userDetails.profilepicimage}
        settweetArea([...tweetArea, newText])
        settext("")
        setimgPre("")
        const data = new FormData();
        data.append("file", img)
        data.append("upload_preset", "filtersocialimages")
        data.append("cloud_name", "filtersocial")
        const res = await fetch("https://api.cloudinary.com/v1_1/filtersocial/image/upload",{
          method: 'POST',
          body: data
        })
        const dataaa = await res.json();
        const ress = await fetch('/alltweetsimage',{
          method: "POST",
          headers:{
            "Content-Type" : "application/json"
          },
      
          body:JSON.stringify({
           t_id: newText.id, mtweet: newText.tweet, url: dataaa.secure_url
          })
        });
      
        const imagedata = await ress.json();
       
        if (res.status === 422 || !imagedata){
      
          console.log("invalid")
        }else{
          toast.success("Tweeted Successfully")
           
            navigate("/")
        } 
      }
      else{
        if(!text){
          toast.error("Please write Somthing in the textbox")
         }else{
          const newText = {id: new Date().getTime().toString(), tweet: text, email: userDetails.email, username : userDetails.username ,name: userDetails.name, image: "", hdata: [], profilepicimage: userDetails.profilepicimage}
          settweetArea([...tweetArea, newText])
          settext("")
         
          const t_id = newText.id
          const  mtweet = newText.tweet

           
          const res = await fetch('/alltweets',{
            method: "POST",
            headers:{
              "Content-Type" : "application/json"
            },
        
            body:JSON.stringify({
             t_id, mtweet
            })
          });
        
          const data = await res.json();
         
          if (res.status === 422 || !data){
        
            console.log("invalid")
          }else{
            toast.success("Tweeted Successfully")
              console.log("hogaya")
        
          }
          navigate("/") 
         }
      }
     
    }

      useEffect(()=>{
        if (img){
          const reader = new FileReader();
          reader.onloadend = () =>{
            setimgPre(reader.result)
          }
          reader.readAsDataURL(img);
         } else{
            setimgPre("")
          }
        
        },[img])


        const imageupload = async(event) =>{
            setimg(event.target.files[0])
          }

  return (
    <>
   <div className="main_mobile" style={{display:"flex", flexDirection:"column"}}>
   <div className="back">
    <i className="fas fa-arrow-left" style={{fontSize:"25px"}} onClick={()=>navigate("/")}></i>
    <button onClick={addItem} className='home_button' disabled={!text && imgPre === ""}>Tweet</button>
    </div>
    <div className="mobilehome_input">
   
    <img src={userDetails.profilepicimage} className="avatar" onClick={()=>navigate("/profile")} alt=""  style={{objectFit:"cover"}}/>

 <div className="input">
   <TextareaAutosize className="input_text" value={text} placeholder="What's happning?" maxLength="150" spellCheck="false"  onChange={(e)=>allheight(e.target.value)} minRows={1.5}
maxRows={15}/>
   {
   imgPre === "" ?
   <></>
   :
   <>
      
   <div className="imgPreviev">
   <div className="close" onClick={()=>setimgPre("")}>X</div>
   <img src={imgPre} alt=""/> 
   </div>
   </>
   }
   
   <div className="all_icons">
   <div className="upload_icons">

  <label htmlFor="file-upload" className="custom-file-upload">
  <i className="fas fa-image"></i>
   </label>
<input type="file" id="file-upload"  accept="image/png, image/jpg, image/gif, image/jpeg" onChange={imageupload}/>

   
  <h4>Limit: 150 Characters</h4>
   </div>
   {/* <button onClick={addItem} className='home_button' >Tweet</button> */}
   </div>
 </div>

</div>
</div>
</>
  )
}

export default MobileTextCompo