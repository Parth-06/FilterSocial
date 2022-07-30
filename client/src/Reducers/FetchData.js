const CheckTheToken = async(state, action)=>{
    switch(action.type){
            case "CTOKEN" 
            : 
                        const res = await fetch("/home", {
                            method: "GET",
                            headers: {
                
                                "Content-Type": "application/json",
                                Accept: "application/json"
                            },
                            credentials: "include"
                        });
                        const user = await res.json();
                      
                            return user
                        
                        default: return state     

    }
}

export default CheckTheToken;