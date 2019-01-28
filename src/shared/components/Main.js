import React, { Component } from 'react';

import { withStyles } from "@material-ui/core";
import Canvas from "./Canvas/Canvas";
import { connect } from "react-redux";
import Controls from "./Controls/Controls";
import ThreeOrbits from '../geometry/algorithms/ThreeOrbits';
import NoSSR from "react-no-ssr";
import Video from './Video/Video';
const algorithms = [
    ThreeOrbits
]

function Main({ classes }) {
    return (<div className={classes.root}>
        <NoSSR>
            <div className={classes.canvasContainer}>
                <Canvas
                    algorithms={algorithms.map(v => v.calc)}
                />
                <Video />
            </div>

        </NoSSR>
        <Controls algorithms={algorithms.map(v => v.renderHint)} />
    </div>)
}



const styles = theme => ({
    root: {
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "stretch",
        height: "100vh",
    },

    canvasContainer: {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-between",
    },

    card: {
        padding: 0,
    }
})


const mapStateToProps = (
    state,
    ownProps
) => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Main));
