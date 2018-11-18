import React, { Component } from 'react';
import './app.styl';

import Helmet from 'react-helmet';
import Canvas from "./components/canvas";

import { Typography, Card, withStyles } from '@material-ui/core';

import UniversalComponent from './components/UniversalComponent';
import Controls from './components/controls';
import { connect } from "react-redux";
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

        const { classes, todos } = this.props;
        return (
            <>
                <Helmet>
                    <title>App Component | React Universal</title>
                </Helmet>


                <Card elevation={24} className={classes.card}>
                    <Canvas />

                    <Controls />

                    {this.props.sliderValue}
                </Card>
            </>
        );
    }
}

const styles = theme => ({
    root: {

    },

    card: {
        padding: 20,
    }
})


const mapStateToProps = (
    state,
    ownProps
) => {
    return {
        sliderValue: state.slider.value
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
