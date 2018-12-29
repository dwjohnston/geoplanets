import React, { Component } from 'react';

import { withStyles } from "@material-ui/core";
import Canvas from "./Canvas/Canvas";
import { connect } from "react-redux";
import Controls from "./Controls/Controls";
import ThreeOrbits from '../geometry/algorithms/ThreeOrbits';

const algorithms = [
    ThreeOrbits
]

function Main({ classes }) {
    return (<div className={classes.root}>
        <Canvas />
        <Controls algorithms={algorithms.map(v => v.renderHint)} />
    </div>)
}



const styles = theme => ({
    root: {
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "stretch"
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
        sliderValue: state.slider.value
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Main));