import React, {
    Component,
} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import sketch from "./videoFlow";
import { videoUpdate } from '../../redux/actions/videoChange';

class VideoCanvas extends Component {
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
        this.canvasPaint.init(
            this.props.videoUpdate,
        );
    }

    // componentWillReceiveProps(props, newProps) {
    //     this.canvasPaint.doUpdate(
    //         props.controlPackage,
    //         props.statePackage,
    //         this.props.algorithms[props.selectedAlgo]
    //     );
    // }


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
        // controlPackage: state.controlState,
        // statePackage: state.stateState,
        // selectedAlgo: state.algorithm.selectedAlgo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        videoUpdate: (payload) => dispatch(videoUpdate(payload))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(VideoCanvas));
