import { useEffect, useState } from "react";
import { TweetVal } from "../../Context/FetchContext";

const useFetchConnect = () => {
  const { newData } = TweetVal();
  const [userdata, setUserdata] = useState([]);
  useEffect(() => {
    const Fetchtweet = async () => {
      const res = await fetch("/connect", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setUserdata(data);
    };
    Fetchtweet();
  }, [newData]);

  return [userdata];
};

export default useFetchConnect;
