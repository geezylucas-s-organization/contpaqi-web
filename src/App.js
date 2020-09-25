import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import NavBar from "./router/NavBar";
import { RoutesPrivate } from "./router/routes";
import { Copyright } from "./components";
import { SignIn } from "./screens";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const App = ({ token }) => {
  const classes = useStyles();

  const PrivateRoute = ({ component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        token !== null ? (
          <Route {...props} component={component} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );

  const Layout = (props) => (
    <React.Fragment>
      <NavBar />
      <main className={classes.content}>
        <Toolbar />
        {props.children}
        <Copyright />
      </main>
    </React.Fragment>
  );

  return (
    <div className={classes.root}>
      <Switch>
        <Route
          path="/signin"
          render={(props) =>
            token === null ? (
              <Route {...props}>
                <SignIn />
              </Route>
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route>
          <Layout>
            <Switch>
              {RoutesPrivate.map((route) => (
                <PrivateRoute
                  key={route.path}
                  component={route.component}
                  path={route.path}
                  exact={route.exact}
                />
              ))}
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps, {})(App);
