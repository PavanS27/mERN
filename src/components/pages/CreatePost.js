import React from "react";
import "../../App.css";

export default function CreatePost() {
  return (
    <div className="card1">
      <input type="text" placeholder="Add Title" />
      <input type="text" placeholder="Caption..." />

      <div className="file-field input-field">
        <div className="btn">
          <span>Upload Pic</span>
          <input type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button className="butt2">Submit Post</button>
    </div>
  );
}
