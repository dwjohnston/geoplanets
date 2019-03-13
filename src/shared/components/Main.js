import React, { Component } from 'react';

import { withStyles } from "@material-ui/core";
import Canvas from "./Canvas/Canvas";
import { connect } from "react-redux";
import Controls from "./Controls/Controls";
import ThreeOrbits from '../geometry/algorithms/ThreeOrbits';
import LfoOrbits from "../geometry/algorithms/DoubleLfoPlanet";
import NoSSR from "react-no-ssr";
import TwoSnakes from '../geometry/algorithms/TwoSnakes';
import SineGenerator from '../geometry/algorithms/SineGenerator';
import UpDownLeftRight from '../geometry/algorithms/UpDownLeftRight';
const algorithms = [
    ThreeOrbits,
    LfoOrbits,

    UpDownLeftRight,

    SineGenerator,
    //TwoSnakes, //State updates aren't working
]

function Main({ classes }) {
    return (<div className={classes.root}>
        <NoSSR>
            <Canvas
                algorithms={algorithms.map(v => v.calc)}
            />
            <Controls algorithms={algorithms.map(v => v.renderHint)} />
        </NoSSR>

    </div>)
}



const styles = theme => ({
    root: {
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "stretch",
        height: "100vh",
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
