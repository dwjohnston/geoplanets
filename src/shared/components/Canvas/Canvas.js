import React, {
    Component,
} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { randomInt } from "davids-toolbox";
import { connect } from 'react-redux';
import sketch from "./sketch";

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.refPaint = React.createRef();
        this.state = {
        };


    }


    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        this.canvasPaint = new p5(sketch, this.refPaint.current);
        this.canvasPaint.doUpdate(
            this.props.controlPackage,
            this.props.statePackage,
            this.props.algorithms[this.props.selectedAlgo]
        );
    }

    componentWillReceiveProps(props, newProps) {
        this.canvasPaint.doUpdate(
            props.controlPackage,
            props.statePackage,
            this.props.algorithms[props.selectedAlgo]
        );
    }


    render() {

        const { classes } = this.props;
        return <div className={classes.root}>
            <div className={classes.canvas} ref={this.refPaint}></div>

        </div >;
    }
}

const styles = {
    root: {
        border: "solid 2px green",
        flex: "1 0 auto",
    },
    canvas: {
        border: "dashed 1px black",
    }
};



const mapStateToProps = (
    state,
    ownProps
) => {
    return {
        controlPackage: state.controlState,
        statePackage: state.stateState,
        selectedAlgo: state.algorithm.selectedAlgo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Canvas));
