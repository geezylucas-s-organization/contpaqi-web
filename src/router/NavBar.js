import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import { RoutesPrivate } from "./routes";
import { logout } from "../store/rootReducer";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = ({ location, logout }) => {
  const classes = useStyles();

  const activeRoute = (routeName) => {
    return location.pathname === routeName ? true : false;
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            PROSIS - Contpaqi Web
          </Typography>
          <Button color="inherit" onClick={logout}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {RoutesPrivate.map((route) => (
              <ListItem
                button
                component={Link}
                to={route.path}
                key={route.path}
                selected={activeRoute(route.path)}
              >
                <ListItemIcon>
                  <route.icon />
                </ListItemIcon>
                <ListItemText primary={route.sidebarName} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

const mapDispatchToProps = { logout };

export default withRouter(connect(null, mapDispatchToProps)(NavBar));
