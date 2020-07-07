import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

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

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            <Link
              to="/"
              style={{ color: "black", fontFamily: "'Grand Hotel', cursive" }}
            >
              Instagram
            </Link>
          </Typography>
          <Button>
            <Link to="/login" style={{ color: "black", fontWeight: 600 }}>
              Login
            </Link>
          </Button>
          <Button>
            {" "}
            <Link to="/signup" style={{ color: "black", fontWeight: 600 }}>
              Signup
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
