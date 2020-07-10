import React, { useEffect, createContext, useReducer, useContext } from "react";
import Navbar from "./components/navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import CreatePost from "./components/pages/CreatePost";
import { reducer, initialState } from "./reducers/userReducer";
import UserProfile from "./components/pages/UserProfile";
import subcribedUserPost from "./components/pages/subcribedUserPost";

export const userContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(userContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/profile" component={Profile}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/signup" component={Signup}></Route>
      <Route path="/createPost" component={CreatePost}></Route>
      <Route path="/profile/:userid" component={UserProfile}></Route>
      <Route path="/followerspost" component={subcribedUserPost}></Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </userContext.Provider>
  );
}

export default App;
