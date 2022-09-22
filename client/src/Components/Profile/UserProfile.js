import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Profile.css";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner";
import useFetch from "../CustomHooks/useFetch";
import { TweetVal } from "../../Context/FetchContext";

const UserProfile = () => {
  const navigate = useNavigate();
  const [tweetdata, setTweetdata] = useState([]);
  const [userProfileDetails, setUserProfileDetails] = useState([]);
  const { username } = useParams();
  const [userDetails] = useFetch();
  const { dispatch, newData } = TweetVal();
  let alldata = tweetdata;
  if (tweetdata) {
    alldata = alldata.filter(
      (items) => items.email === userProfileDetails.email
    );
  }
  let newtweetdata = alldata;

  useEffect(() => {
    const FetchProfile = async () => {
      const res = await fetch(`/userProfile/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setUserProfileDetails(data.user);
    };
    FetchProfile();
  }, [newData]);

  useEffect(() => {
    const Fetchtprofdetails = async () => {
      const res = await fetch("/userprofiletweets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      setTweetdata(data);
    };
    Fetchtprofdetails();
  }, [newData]);

  return (
    <>
      {userDetails.bookmark === undefined &&
      userDetails.following === undefined ? (
        <div className="userspinnerstyle">
          <Spinner />
        </div>
      ) : (
        <div className="profile_main" id="profile_main">
          <div className="profile_header">
            <h1>
              <i
                onClick={() => navigate("/")}
                className="fas fa-arrow-left"
              ></i>
              {userProfileDetails.name}
            </h1>
          </div>
          <div className="profile_sec">
            <div className="cover_image"></div>
            <div>
              <img
                src={userProfileDetails.profilepicimage}
                className="profile_image"
                alt=""
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="bio_sec">
              <div className="name_sec">
                <h1>{userProfileDetails.name}</h1>
                <p>@{userProfileDetails.username}</p>
              </div>

              {userDetails.following.includes(username) ? (
                <button
                  className="profile_button"
                  onClick={() =>
                    dispatch({
                      type: "UNFOLLOW",
                      payload: username,
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
                      payload: username,
                    })
                  }
                >
                  Follow
                </button>
              )}
            </div>
            <div className="profile_details">
              <div className="all_profdetails">
                {userProfileDetails.Bio === "" ? (
                  <p className="bio_details" style={{ display: "none" }}>
                    {userProfileDetails.Bio}
                  </p>
                ) : (
                  <p className="bio_details">{userProfileDetails.Bio}</p>
                )}
                {userProfileDetails.Location === "" ? (
                  <p style={{ display: "none" }}>
                    <i className="fas fa-map-marker-alt"></i>
                    {userProfileDetails.Location}
                  </p>
                ) : (
                  <p style={{ marginBottom: "0.5rem" }}>
                    <i className="fas fa-map-marker-alt"></i>
                    {userProfileDetails.Location}
                  </p>
                )}
              </div>
              <div className="followers">
                {userProfileDetails.followers === undefined ? (
                  <>
                    0{" "}
                    <p
                      onClick={() =>
                        navigate("/userfollowers", {
                          state: { data: username },
                        })
                      }
                    >
                      Followers
                    </p>
                  </>
                ) : (
                  <>
                    {userProfileDetails.followers.length}{" "}
                    <p
                      onClick={() =>
                        navigate("/userfollowers", {
                          state: { data: username },
                        })
                      }
                    >
                      Followers
                    </p>
                  </>
                )}

                {userProfileDetails.following === undefined ? (
                  <>
                    <p
                      onClick={() =>
                        navigate("/userfollowing", {
                          state: { data: username },
                        })
                      }
                    >
                      Following
                    </p>
                  </>
                ) : (
                  <>
                    {userProfileDetails.following.length}{" "}
                    <p
                      onClick={() =>
                        navigate("/userfollowing", {
                          state: { data: username },
                        })
                      }
                    >
                      Following
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="tweets">
            {newtweetdata
              .slice(0)
              .reverse()
              .map((item) => {
                return (
                  <div className="all_tweets" key={item.id}>
                    <div className="text_tweets">
                      <img
                        src={userProfileDetails.profilepicimage}
                        className="avatar"
                        alt=""
                        style={{ objectFit: "cover" }}
                      />
                      <div className="tweet_area">
                        <div className="user_name">
                          <h3>{userProfileDetails.name}</h3>
                        </div>
                        <div className="main_tweet">
                          {item.image === "" ? (
                            <p>{item.tweet}</p>
                          ) : item.tweet === "" ? (
                            <>
                              <div className="tweet_image">
                                <img src={item.image} alt="" />
                              </div>
                            </>
                          ) : (
                            <>
                              <p>{item.tweet}</p>
                              <div className="tweet_image">
                                <img src={item.image} alt="" />
                              </div>
                            </>
                          )}
                        </div>
                        <div className="tweet_icons">
                          {item.hdata.includes(userDetails.email) ? (
                            <>
                              <i
                                className="fas fa-heart"
                                style={{ color: "rgb(249, 24, 128)" }}
                                onClick={() =>
                                  dispatch({
                                    type: "UnLike",
                                    payload: item.id,
                                  })
                                }
                              ></i>
                            </>
                          ) : (
                            <>
                              <i
                                className="far fa-heart"
                                onClick={() =>
                                  dispatch({
                                    type: "Like",
                                    payload: item.id,
                                  })
                                }
                              ></i>
                            </>
                          )}

                          {item.hdata.length > 0 ? (
                            <p className="Like_number">{item.hdata.length}</p>
                          ) : (
                            <p
                              className="Like_number"
                              style={{ color: "black" }}
                            >
                              {item.hdata.length}
                            </p>
                          )}

                          {userDetails.bookmark.includes(item.id) ? (
                            <i
                              className="fas fa-bookmark"
                              onClick={() =>
                                dispatch({
                                  type: "UnBookmark",
                                  payload: item.id,
                                })
                              }
                            ></i>
                          ) : (
                            <i
                              className="far fa-bookmark"
                              onClick={() =>
                                dispatch({
                                  type: "Bookmark",
                                  payload: item.id,
                                })
                              }
                            ></i>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
