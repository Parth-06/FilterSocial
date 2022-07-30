import React, { useContext, useState, useEffect, createContext } from "react";
import Pusher from "pusher-js";

const FetchContext = createContext();

const FetchContextProvider = ({children}) =>{
    const [apidata, setApidata] = useState([]);
    const [newData, setnewData] = useState([]);
    

    useEffect(()=>{
      const Fetchtweet = async () =>{ 
    
          const res = await fetch('/alltweets',{
            method: "GET",
            headers:{
              "Content-Type" : "application/json"
            },
          });
        
          const data = await res.json();
          setApidata(data)
         
        }
        Fetchtweet()
    
    },[newData])

    useEffect(()=>{
        const pusher = new Pusher('bfad7d924b358ce37229', {
          cluster: 'ap2'
        });
      
        
        const channel = pusher.subscribe('maintweets');
        channel.bind('inserted', (data) =>{
          if(data){
            // console.log(data);
            setnewData(data)
          }
        
        })
      },[])

  
    
    
    return(
        <FetchContext.Provider value={{apidata}}>
            {children}
        </FetchContext.Provider>
        )
    
    }   

export default FetchContextProvider;
export const TweetVal = () =>{
    return useContext(FetchContext)
}