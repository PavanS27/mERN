import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { userContext } from "../App";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: "auto",
    bottom: 0,
    height: 20,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -17,
    left: 0,
    right: 0,
    margin: "0 auto",
    height: 10,
    width: 40,
    color: "white",
  },
}));

export default function Bottombar() {
  const classes = useStyles();
  const { state, dispatch } = useContext(userContext);

  const render = () => {
    if (state) {
      return [
        <React.Fragment>
          <AppBar
            position="fixed"
            color="transparent"
            className={classes.appBar}
          >
            <Toolbar>
              <Link to="/createPost">
                <Fab
                  color="secondary"
                  aria-label="add"
                  className={classes.fabButton}
                >
                  <AddIcon />
                </Fab>
              </Link>
            </Toolbar>
          </AppBar>
        </React.Fragment>,
      ];
    }
  };

  return <>{render()}</>;
}
