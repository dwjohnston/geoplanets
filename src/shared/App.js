import React, { Component, Fragment } from 'react';
import './app.styl';

import Helmet from 'react-helmet';

import { Switch, Route } from "react-router-dom";
import Main from './components/Main';
import Test from './components/Test';
/**
 * The `App` component is the entry point for the react app.
 * It is rendered on the client as well as on the server.
 *
 * This is also the entry point for react router, declare any
 * of your top-level routes here.
//  */
// @connect(mapStateToProps, {
//     addTodo
// })
class App extends Component {

    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>App Component | React Universal</title>
                </Helmet>


                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/test" component={Test} />
                </Switch>


            </Fragment>
        );
    }
}

export default App; 