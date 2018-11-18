import React, {
    Component,
} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { randomInt } from "davids-toolbox";
import { connect } from 'react-redux';

class Canvas extends Component {
    constructor(props) {
        super(props);

        this.ref = React.createRef();
        this.refLarge = React.createRef();

        this.state = {
        };


    }


    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        const context = this.ref.current.getContext("2d");
        const context2 = this.refLarge.current.getContext("2d");
        const draw = () => {

            const randA = randomInt(0, 76);
            const randB = randomInt(0, 12);

            context.fillStyle = "rgba(0, 0, 0, 0.1)";
            context2.fillStyle = "rgba(0, 0, 0, 0.1)";

            context.fillRect(0, 0, 77, 13);
            context2.fillRect(0, 0, 770, 130);
            context.fillStyle = "rgba(255, 0, 0, 1)";
            context2.fillStyle = "rgba(255, 0, 0, 1)";

            context.fillRect(randA, randB, 2, 2);
            context2.fillRect(randA * 10, randB * 10, this.props.sliderValue * 10, this.props.sliderValue * 10);
            window.requestAnimationFrame(draw);
        }

        window.requestAnimationFrame(draw);
    }



    render() {

        const { classes } = this.props;
        return <div className={classes.root}>

            <p>
                Actual 77 x 13 canvas
            </p>
            <canvas width="77" height="13" ref={this.ref} />

            <p>
                770 x 130 canvas for better viewing
            </p>
            <canvas width="770" height="130" ref={this.refLarge} />

        </div>;
    }
}

const styles = {
    root: {
        border: "solid 2px green",
        padding: 10,
        margin: 10,
    },
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
