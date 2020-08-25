import React from "react";
import {Switch, Route} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import NavBar from "./router/NavBar";
import {Routes, RoutesExact} from "./router/routes";
import {Copyright} from "./components";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const App = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavBar/>
            <main className={classes.content}>
                <Toolbar/>
                <Switch>
                    {RoutesExact.map((route) => (
                        <Route path={route.path} key={route.path} exact>
                            <route.component/>
                        </Route>
                    ))}
                    {Routes.map((route) => (
                        <Route path={route.path} key={route.path}>
                            <route.component/>
                        </Route>
                    ))}
                </Switch>
                <Copyright/>
            </main>
        </div>
    );
};

export default App;
