import React, { useState, useEffect } from "react";
import "../../App.css";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

export default function Signup() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ista-clone");
    data.append("cloud_name", "dbkwbufra");
    fetch("	https://api.cloudinary.com/v1_1/dbkwbufra/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url));
  };
  const uploadFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "Invalid Email" });
      return;
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({ html: data.message, classes: "#2e7d32 green darken-3" });
          history.push("/signin");
        }
      })
      .catch((err) => [console.log(err)]);
  };
  const postData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };
  return (
    <div>
      <div className="card">
        <h2 className="lheader">Instagram</h2>
        <input
          type="text"
          placeholder="Username"
          id="input1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="E-mail"
          id="input1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          id="input2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="file-field input-field" style={{ marginTop: 50 }}>
          <div className="btn">
            <span>Upload Pic</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button className="butt1" onClick={() => postData()}>
          Sign Up
        </button>
        <h6 className="or">OR</h6>
        <h6
          style={{
            position: "absolute",
            top: "90%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "100%",
          }}
        >
          Already have an account?{" "}
          <b>
            <Link to="/login" style={{ color: "black" }}>
              Sign In
            </Link>
          </b>
        </h6>
      </div>
    </div>
  );
}
