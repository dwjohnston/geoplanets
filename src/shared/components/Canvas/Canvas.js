import React, {
    Component,
} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { updateState } from "../../redux/actions/updateState";
import sketch from "./sketch";

class Canvas extends Component {
    constructor(props) {
        super(props);

        this.refTemp = React.createRef();
        this.refPaint = React.createRef();

        this.state = {
        };


    }


    // shouldComponentUpdate() {
    //     return false;
    // }

    componentDidMount() {

        import("p5").then((p5) => {
            console.log(p5);
            console.log(this.refPaint);
            this.canvasPaint = new p5.default(sketch, this.refPaint.current);


            this.canvasPaint.init(
                this.props.controlPackage,
                this.props.statePackage,
                this.props.algorithms[this.props.selectedAlgo],
                this.props.updateState,
            );
        });


    }

    componentDidUpdate(prevProps) {

        if ((this.props.controlPackage != prevProps.controlPackage
            || this.props.selectedAlgo != prevProps.selectedAlgo
            || this.props.statePackage != prevProps.statePackage
        ) && this.canvasPaint) {

            console.log("update");
            this.canvasPaint.doUpdate(
                this.props.controlPackage,
                this.props.statePackage,
                this.props.algorithms[this.props.selectedAlgo],
                this.props.updateState,
            );

        }

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
        updateState: data => dispatch(updateState(data))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Canvas));
