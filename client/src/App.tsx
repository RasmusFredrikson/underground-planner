import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Overview } from "./Components/Overview";

export default function App() {
    // A <Switch> looks through its children <Route>s and
    // renders the first one that matches the current URL.
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <Overview />
                </Route>
            </Switch>
        </Router>
    );
}
