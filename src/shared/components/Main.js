import React, { Component } from 'react';

import { withStyles } from "@material-ui/core";
import Canvas from "./Canvas/Canvas";
import { connect } from "react-redux";
import Controls from "./Controls/Controls";

function Main({ classes }) {
    return (<div className={classes.root}>
        <Canvas />
        <Controls />
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
