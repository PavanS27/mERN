import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import CreatePost from "./components/pages/CreatePost";
function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home}></Route>
      <Route path="/profile" component={Profile}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/signup" component={Signup}></Route>
      <Route path="/createPost" component={CreatePost}></Route>
    </Router>
  );
}

export default App;
