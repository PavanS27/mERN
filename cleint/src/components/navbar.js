import React, { useContext, useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../App";
import M from "materialize-css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "black",
  },
  title: {
    flexGrow: 1,
    color: "black",
  },
}));

export default function Navbar() {
  const searchModal = useRef(null);
  const classes = useStyles();
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState([]);
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);
  const { state, dispatch } = useContext(userContext);
  const renderList = () => {
    if (state) {
      return [
        <>
          <Button>
            <i
              data-target="modal1"
              className="fa fa-search modal-trigger"
              style={{ fontSize: "17px" }}
            ></i>
          </Button>
          <Button>
            <Link to="/profile" style={{ color: "black", fontWeight: 600 }}>
              Profile
            </Link>
          </Button>

          <Button>
            <a
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "CLEAR" });
                history.push("/login");
              }}
              style={{ color: "black", fontWeight: 600 }}
            >
              Logout
            </a>
          </Button>
        </>,
      ];
    } else {
      return [
        <>
          <Button>
            <Link to="/login" style={{ color: "black", fontWeight: 600 }}>
              Login
            </Link>
          </Button>
          <Button>
            <Link to="/signup" style={{ color: "black", fontWeight: 600 }}>
              Signup
            </Link>
          </Button>
        </>,
      ];
    }
  };

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setUserName(result.user);
      });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "white" }}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            <Link
              to={state ? "/" : "/login"}
              style={{ color: "black", fontFamily: "'Grand Hotel', cursive" }}
            >
              Instagram
            </Link>
          </Typography>
          {renderList()}
          <div id="modal1" className="modal" ref={searchModal}>
            <div className="modal-content">
              <input
                type="text"
                placeholder="Search User"
                value={search}
                onChange={(e) => fetchUsers(e.target.value)}
              />
              <ul className="collection" style={{ color: "black" }}>
                {userName.map((item) => {
                  return (
                    <Link
                      to={
                        item._id !== state._id
                          ? "/profile/" + item._id
                          : "/profile"
                      }
                      onClick={() =>
                        M.Modal.getInstance(searchModal.current).close()
                      }
                    >
                      <li className="collection-item">{item.name}</li>
                    </Link>
                  );
                })}
              </ul>
            </div>
            <div className="modal-footer">
              <a
                href="#!"
                onClick={() => setSearch("")}
                className="modal-close waves-effect waves-green btn-flat"
              >
                Close
              </a>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
