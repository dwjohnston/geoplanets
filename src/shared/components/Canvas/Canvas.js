import React, {
    Component,
} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { randomInt } from "davids-toolbox";
import { connect } from 'react-redux';

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

        const draw = () => {
            window.requestAnimationFrame(draw);
        }
        window.requestAnimationFrame(draw);

    }



    render() {

        const { classes } = this.props;
        return <div className={classes.root}>
            <canvas className={classes.canvas} width="100" height="100" ref={this.refLarge} />
        </div>;
    }
}

const styles = {
    root: {
        border: "solid 2px green",
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
        sliderValue: state.slider.value
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
