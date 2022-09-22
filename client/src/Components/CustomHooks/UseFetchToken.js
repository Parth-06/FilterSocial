import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const useFetchToken = () => {
  const [userDetails, setUserDetails] = useState([""]);
  const navigate = useNavigate();
  useEffect(() => {
    const Callmainpage = async () => {
      try {
        const res = await fetch("/home", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });
        const user = await res.json();
        setUserDetails(user);
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
        toast.error("Please Login For Better Experience");
        navigate("/signin");
      }
    };
    Callmainpage();
  }, []);
  return [userDetails];
};

export default useFetchToken;
