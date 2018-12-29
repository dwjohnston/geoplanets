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

        this.refTemp = React.createRef();
        this.refPaint = React.createRef();

        this.state = {
        };


    }


    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {

        // const draw = () => {
        //     window.requestAnimationFrame(draw);
        // }
        // window.requestAnimationFrame(draw);

        import("p5").then((p5) => {
            console.log(p5);
            console.log(this.refPaint);
            this.canvas = new p5.default(sketch, this.refPaint.current);
            this.canvas.doUpdate(
                this.props.controlPackage,
                this.props.statePackage,
                this.props.algorithms[this.props.selectedAlgo].calc
            );
        });


    }

    componentWillReceiveProps(props, newProps) {
        this.canvas.doUpdate(
            newProps.controlPackage,
            newProps.statePackage,
            this.props.algorithms[newProps.selectedAlgo].calc
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
        controlPackage: state.controlPackage,
        statePackage: state.statePackage,
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
