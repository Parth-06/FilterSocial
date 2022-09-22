import { useEffect, useState } from "react";
import { TweetVal } from "../../Context/FetchContext";

const useFetchTweet = () => {
  const { newData } = TweetVal();
  const [tweetdata, setTweetdata] = useState([]);

  useEffect(() => {
    const Fetchtweet = async () => {
      const res = await fetch("/alltweets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setTweetdata(data);
    };
    Fetchtweet();
  }, [newData]);

  return [tweetdata];
};

export default useFetchTweet;
