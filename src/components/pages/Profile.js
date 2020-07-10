import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../../App";
export default function Profile() {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(userContext);
  useEffect(() => {
    fetch("/myposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.myPost);
      });
  }, []);
  return (
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
          <h4>{state ? state.name : "Loading..."}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "110%",
            }}
          >
            <small>{mypics.length} posts</small>
            <small>{state ? state.followers.length : "0"} followers</small>
            <small>{state ? state.following.length : "0"} following</small>
          </div>
        </div>
      </div>
      <div className="gallery">
        {mypics.map((item) => {
          return (
            <img key={item._id} src={item.photo} className="item" alt="post" />
          );
        })}
      </div>
    </div>
  );
}
