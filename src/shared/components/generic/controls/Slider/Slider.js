import React, {
    Component,
} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiSlider from '@material-ui/lab/Slider';
import { Typography, Card } from '@material-ui/core';

import PropTypes from 'prop-types';
import { randomStep } from "davids-toolbox";
import { connect } from 'react-redux';

class Slider extends Component {
    constructor(props) {
        super(props);

        console.log(props);
        // const value = randomStep(this.props.min, this.props.max, this.props.step);
        this.state = { value: props.initialValue };

        //props.onChange(props.id, value);
    }


    componentDidUpdate(prevProps) {
        if (this.props.random != prevProps.random) {
            const value = randomStep(this.props.min, this.props.max, this.props.step);
            this.setState({
                value
            });

            this.props.onChange(this.props.id, value);


        }
    }

    handleChange = (e, v) => {
        this.setState({
            value: v
        });
        this.props.onChange([this.props.id], v)
    }

    render() {
        const { classes, min, max, step, randMin, randMax, label, id } = this.props;
        return <Card className={classes.root} elevantion={2}>
            <Typography color="inherit" id={`label-${id}`}>{label}</Typography>

            <div className={classes.sliderWrapper}>
                <MuiSlider
                    classes={{ root: classes.sliderRoot, container: classes.slider }}
                    vertical
                    value={this.state.value}
                    onChange={this.handleChange}
                    min={min}
                    max={max}
                    step={step}
                    aria-labelledby={`label-${id}`}
                    color="secondary"
                />
            </div>
            <Typography color="inherit" id={`value-${id}`}>{Number.parseFloat(this.state.value).toPrecision(3)}</Typography>

        </Card >;
    }
}


Slider.propTypes = {
    classes: PropTypes.object,
    initialValue: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    label: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func
};
const styles = theme => ({

    root: {
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        height: 150,
        margin: theme.spacing.unit

    },
    sliderWrapper: {
        display: 'flex',
        height: "100%",
        margin: 5,
    },
    slider: {
        padding: '0px 22px',
    },

    sliderRoot: {
        width: "auto",
    }
});





const mapStateToProps = (
    state,
    ownProps
) => {
    return {
        random: state.random
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Slider));
