import React, { useState } from "react";
import "../../App.css";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

export default function Login() {
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const postData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "Invalid Email" });
      return;
    }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({
            html: "Signed In Successfully",
            classes: "#2e7d32 green darken-3",
          });
          history.push("/");
        }
      })
      .catch((err) => [console.log(err)]);
  };
  return (
    <div className="card">
      <h2 className="lheader">Instagram</h2>
      <input
        type="text"
        placeholder="E-mail"
        id="input1"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        id="input2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="butt" onClick={() => postData()}>
        Log In
      </button>
      <h6 className="or">OR</h6>
      <h6
        style={{
          position: "absolute",
          top: "80%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "100%",
        }}
      >
        Don't have an account?{" "}
        <b>
          <Link to="/signup" style={{ color: "black" }}>
            Sign up
          </Link>
        </b>
      </h6>
    </div>
  );
}
