import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../App";

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
  const classes = useStyles();
  const history = useHistory();
  const { state, dispatch } = useContext(userContext);
  const renderList = () => {
    if (state) {
      return [
        <>
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
        </Toolbar>
      </AppBar>
    </div>
  );
}
