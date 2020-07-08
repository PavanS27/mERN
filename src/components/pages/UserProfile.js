import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../../App";
import { useParams } from "react-router-dom";
export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
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
                <small>40 followers</small>
                <small>40 following</small>
              </div>
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
