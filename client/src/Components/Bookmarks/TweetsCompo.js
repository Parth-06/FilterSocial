import React, {  useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Pusher from "pusher-js"
import Spinner from '../Spinner';

const TweetsCompo = () => {
    const [newData, setnewData] = useState([]);
    const [tweetdata, setTweetdata] = useState([])
    const [userDetails, setUserDetails] = useState([""]);
    const navigate= useNavigate();
    let alldata = tweetdata;
    if(tweetdata && userDetails.bookmark === undefined){
    
    
    }else{
      alldata = alldata.filter(
        (items) => userDetails.bookmark.includes(items.id)
       )
    }
    let newtweetdata = alldata

   
    useEffect(()=>{
     const pusher = new Pusher('bfad7d924b358ce37229', {
          cluster: 'ap2'
        });
      
        const channel = pusher.subscribe('maintweets');
        channel.bind('inserted', (data) =>{
          if(data){   
            setnewData(data)
          }
        })
      
        const channelmain = pusher.subscribe('likeupdter');
        channelmain.bind('updated', (dataa) =>{
          if(dataa){
            setnewData(dataa)
          }
        })
      
        const channeldelete = pusher.subscribe('deletedata');
        channeldelete.bind('deleted', (deletedata) =>{
          if(deletedata){
            setnewData(deletedata)
          }
        })    
      },[])

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
              //  logoutdispatch({type:"USER", payload:true})
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
      },[newData]);

      useEffect(()=>{
        const Fetchtweet =async () =>{ 
    
            const res = await fetch('/alltweets',{
              method: "GET",
              headers:{
                "Content-Type" : "application/json"
              },
            });
          
            var data = await res.json();
            setTweetdata(data)
           
          }
          Fetchtweet();
    
      },[newData])

      const LikeData = async(item_id) =>{

        const email =  userDetails.email  
       await fetch('/likevalue',{
              method: "POST",
              headers:{
                "Content-Type" : "application/json"
              },
          
              body:JSON.stringify({
                item_id, email
              })
            });
   
}

const unLikeData = async(item_id) =>{

  const email =  userDetails.email
 await fetch('/unlikevalue',{
        method: "POST",
        headers:{
          "Content-Type" : "application/json"
        },
    
        body:JSON.stringify({
          item_id, email
        })
      });

}


const bookmarkData = async(item_id) =>{
  const res = await fetch('bookmarks',{
          method: "POST",
          headers:{
            "Content-Type" : "application/json"
          },
      
          body:JSON.stringify({
            item_id
          })

         
        });
        var data = await res.json();
        setnewData(data)
  
  }

  const removebookmarkData = async(item_id) =>{
   
    const res = await fetch('/removebookmarks',{
            method: "POST",
            headers:{
              "Content-Type" : "application/json"
            },
        
            body:JSON.stringify({
              item_id
            })
          });
          var data = await res.json();
          setnewData(data)
    
    }

  return (
    <>
    { userDetails.bookmark ===  undefined ? 
    <div className='spinnerstyle'> 
      <Spinner/>
    </div>
    :
    <div className="tweets">
    {
      
      newtweetdata.slice(0).reverse().map((item)=>{
        return(
          <div className="all_tweets" key={item.id}>
  
          <div className="text_tweets">
         <Link to={item.username !== userDetails.username ? "/profile/"+item.username : "/profile"}>
         
         <img src={item.profilepicimage} className="avatar" alt='' style={{objectFit:"cover"}}/>
         </Link>
          <div className="tweet_area">
            <Link to={item.username !== userDetails.username ? "/profile/"+item.username : "/profile"} className="for_link">
              <div className="user_name"><h3>{item.name}</h3>
             <p style={{color: "rgb(85, 83, 83)",marginLeft:"3px"} }>@{item.username}</p>
              </div></Link>
            <div className="main_tweet">
            {item.image === ""
            ?
            <p>{item.tweet}</p>
            :(item.tweet === "")?
            <>
            <div className="tweet_image">
            <img src={item.image} alt=""/>
            </div></>
            :
            <><p>{item.tweet}</p>
            <div className="tweet_image">
            <img src={item.image} alt=""/>
            </div></>
            }
            
              </div>
            <div className="tweet_icons">
           
               { 
                item.hdata.includes(userDetails.email)
                ?
               ( <><i className="fas fa-heart" style={{color:"rgb(249, 24, 128)"}} onClick={()=>unLikeData(item.id)}></i></>)
             :

           ( <><i className="far fa-heart"  onClick={()=>LikeData(item.id)}></i></>)
              
              }
              {
                item.hdata.length>0?
                <p className='Like_number'>{item.hdata.length}</p>
                :
                <p className='Like_number' style={{color: "black"}}>{item.hdata.length}</p>
              }
        
            {
                userDetails.bookmark.includes(item.id) ?
                <i className="fas fa-bookmark" onClick={()=>removebookmarkData(item.id)}></i>
                :
                <i className="far fa-bookmark" onClick={()=>bookmarkData(item.id)}></i>
            }


            </div>
          </div>
          </div>
        </div>
        )
      })

    }

  </div>
    }
</>

  )
}

export default TweetsCompo