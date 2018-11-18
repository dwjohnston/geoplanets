import React, {
    Component,
} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';


import { connect } from 'react-redux';
import { sliderUpdate } from '../../actions/sliderChange';


class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value };
    }

    handleChange = (e, v) => {
        this.setState({
            value: v
        });
        this.props.sliderUpdate("slider", v)
    }
    render() {

        const { classes } = this.props;
        return <div className={classes.root}>

            <Slider
                classes={{ root: classes.sliderRoot, container: classes.slider }}
                vertical
                value={this.state.value}
                onChange={this.handleChange}
                min={1}
                max={10}
                step={1}
            />
        </div>;
    }
}

const styles = {
    root: {
        display: 'flex',
        height: 300,
    },
    slider: {
        padding: '0px 22px',
    },

    sliderRoot: {
        width: "auto",
    }
};


const mapStateToProps = (
    state,
    ownProps
) => {
    return {
        value: state.slider.value,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        sliderUpdate: (n, v) => dispatch(sliderUpdate(n, v))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Controls));
