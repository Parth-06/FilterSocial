import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useReducer,
} from "react";
import Pusher from "pusher-js";
import { LikesReducer } from "../Reducers/Reducer";

const FetchContext = createContext();

const FetchContextProvider = ({ children }) => {
  const [apidata, setApidata] = useState([]);
  const [newData, setnewData] = useState([]);

  useEffect(() => {
    const Fetchtweet = async () => {
      const res = await fetch("/alltweets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setApidata(data);
    };
    Fetchtweet();
  }, [newData]);

  useEffect(() => {
    const pusher = new Pusher("bfad7d924b358ce37229", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("maintweets");
    channel.bind("inserted", (data) => {
      if (data) {
        setnewData(data);
      }
    });

    const channelmain = pusher.subscribe("likeupdter");
    channelmain.bind("updated", (dataa) => {
      if (dataa) {
        // console.log(dataa);
        setnewData(dataa);
      }
    });
    const channeldelete = pusher.subscribe("deletedata");
    channeldelete.bind("deleted", (deletedata) => {
      if (deletedata) {
        setnewData(deletedata);
      }
    });
    const channelfollow = pusher.subscribe("updatingFollow");
    channelfollow.bind("updated", (followData) => {
      if (followData) {
        setnewData(followData);
      }
    });
  }, []);
  const [state, dispatch] = useReducer(LikesReducer, {
    Like: [],
    Unlike: [],
    Follow: [],
    UNFollow: [],
    Bookmark: [],
    UnBookmark: [],
  });
  return (
    <FetchContext.Provider value={{ state, dispatch, apidata, newData }}>
      {children}
    </FetchContext.Provider>
  );
};

export default FetchContextProvider;
export const TweetVal = () => {
  return useContext(FetchContext);
};
