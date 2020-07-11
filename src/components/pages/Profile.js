import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../../App";
export default function Profile() {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(userContext);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
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

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "ista-clone");
      data.append("cloud_name", "dbkwbufra");
      fetch("	https://api.cloudinary.com/v1_1/dbkwbufra/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUrl(data.url);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...state, pic: data.url })
          );
          dispatch({ type: "UPDATEPIC", payload: data.url });
          window.location.reload();
        });
    }
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };
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
            src={state ? state.pic : "Loading..."}
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
              flexWrap: "wrap",
            }}
          >
            <small>{mypics.length} posts</small>
            <small>{state ? state.followers.length : "0"} followers</small>
            <small>{state ? state.following.length : "0"} following</small>
          </div>
        </div>
        <div style={{ position: "absolute", top: "20%", left: "50%" }}>
          {" "}
          <div className="file-field input-field" style={{ marginTop: 50 }}>
            <div
              className="btn"
              style={{
                fontSize: "10px",
                height: "30px",
                paddingBottom: "10px",
              }}
            >
              <span>Update Pic</span>
              <input
                type="file"
                onChange={(e) => updatePhoto(e.target.files[0])}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
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
