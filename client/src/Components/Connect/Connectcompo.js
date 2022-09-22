import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TweetVal } from "../../Context/FetchContext";
import useFetch from "../CustomHooks/useFetch";
import useFetchConnect from "../CustomHooks/useFetchConnect";
import Spinner from "../Spinner";
import "./Connect.css";

const Connectcompo = () => {
  const { dispatch } = TweetVal();
  const [userdata] = useFetchConnect();
  const [userDetails] = useFetch();

  let alldata = userdata;
  if (userdata) {
    alldata = alldata.filter((items) => items.email !== userDetails.email);
  }
  let newtweetdata = alldata;

  return (
    <>
      {userDetails.following === undefined ? (
        <div className="spinnerstyle">
          <Spinner />
        </div>
      ) : (
        <div>
          {newtweetdata.map((item) => {
            return (
              <div className="connect_main" key={item.username}>
                <Link
                  to={
                    item.username !== userDetails.username
                      ? "/profile/" + item.username
                      : "/profile"
                  }
                  onClick={() => setnewData(item.username)}
                >
                  <img
                    src={item.profilepicimage}
                    className="avatar"
                    alt=""
                    style={{ objectFit: "cover" }}
                  />
                </Link>

                <Link
                  to={
                    item.username !== userDetails.username
                      ? "/profile/" + item.username
                      : "/profile"
                  }
                  className="for_link"
                >
                  <div className="username">
                    <h3>{item.name}</h3>
                    <p>{item.username}</p>
                  </div>
                </Link>

                <div className="button_connect">
                  {userDetails.following.includes(item.username) ? (
                    <button
                      className="profile_button"
                      onClick={() =>
                        dispatch({
                          type: "UNFOLLOW",
                          payload: item.username,
                        })
                      }
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="profile_button"
                      onClick={() =>
                        dispatch({
                          type: "FOLLOW",
                          payload: item.username,
                        })
                      }
                    >
                      Follow
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Connectcompo;
