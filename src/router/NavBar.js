import React from "react";
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
} from "@material-ui/core";
import { RoutesExact } from "./routes";

const drawerWidth = 220;

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
}));

const NavBar = ({ location }) => {
  const classes = useStyles();

  const activeRoute = (routeName) => {
    return location.pathname === routeName ? true : false;
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Contpaq web
          </Typography>
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
            {RoutesExact.map((route) => (
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

export default withRouter(NavBar);
