import React from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner";
import useFetch from "../CustomHooks/useFetch";
import useFetchTweet from "../CustomHooks/UseFetchTweet";
import { TweetVal } from "../../Context/FetchContext";

const TweetsCompo = () => {
  const { dispatch } = TweetVal();
  const [tweetdata] = useFetchTweet();
  const [userDetails] = useFetch();

  let alldata = tweetdata;
  if (tweetdata && userDetails.bookmark === undefined) {
  } else {
    alldata = alldata.filter((items) =>
      userDetails.bookmark.includes(items.id)
    );
  }
  let newtweetdata = alldata;

  return (
    <>
      {userDetails.bookmark === undefined ? (
        <div className="spinnerstyle">
          <Spinner />
        </div>
      ) : (
        <div className="tweets">
          {newtweetdata
            .slice(0)
            .reverse()
            .map((item) => {
              return (
                <div className="all_tweets" key={item.id}>
                  <div className="text_tweets">
                    <Link
                      to={
                        item.username !== userDetails.username
                          ? "/profile/" + item.username
                          : "/profile"
                      }
                    >
                      <img
                        src={item.profilepicimage}
                        className="avatar"
                        alt=""
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                    <div className="tweet_area">
                      <Link
                        to={
                          item.username !== userDetails.username
                            ? "/profile/" + item.username
                            : "/profile"
                        }
                        className="for_link"
                      >
                        <div className="user_name">
                          <h3>{item.name}</h3>
                          <p
                            style={{
                              color: "rgb(85, 83, 83)",
                              marginLeft: "3px",
                            }}
                          >
                            @{item.username}
                          </p>
                        </div>
                      </Link>
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
                          <p className="Like_number" style={{ color: "black" }}>
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
      )}
    </>
  );
};

export default TweetsCompo;
