import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../../App";
import { useParams } from "react-router-dom";
export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [showFollow, setShowFollow] = useState(true);
  const { state, dispatch } = useContext(userContext);
  const { userid } = useParams();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await fetch(`/user/${userid}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });

    const data = await response.json();

    setUserProfile(data);
  };

  const followUser = () => {
    fetch("/follow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setUserProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };
  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));

        setUserProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };

  return (
    <>
      {!userProfile ? (
        <h2>Loading...</h2>
      ) : (
        <div style={{ maxWidth: "600px", margin: "0px auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "18px 0px",
            }}
          >
            <div>
              <img
                src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
                style={{ width: "130px", height: "130px", borderRadius: "50%" }}
              />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "110%",
                }}
              >
                <small>{userProfile.posts.length} posts</small>
                <small>{userProfile.user.followers.length} followers</small>
                <small>{userProfile.user.following.length} following</small>
              </div>
              {showFollow ? (
                <button onClick={() => followUser()}>Follow</button>
              ) : (
                <button onClick={() => unfollowUser()}>Unfollow</button>
              )}
            </div>
          </div>
          <div className="gallery">
            {userProfile.posts.map((item) => {
              return (
                <img
                  key={item._id}
                  src={item.photo}
                  className="item"
                  alt="post"
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
