import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import * as ValueType from "../../geometry/renderHints/ValueTypes";
import Slider from '../generic/controls/Slider/Slider';
import Rgba from "../generic/controls/Rgba/Rgba";

const renderControl = (value, rest) => {
    switch (value.type) {
        case ValueType.RANGE: return (<Slider {...value} {...rest} />);
        case ValueType.RGBA: return (<Rgba {...value} {...rest} />);
        default: return <span>error, type no recognised </span>
    }
}

const Control = ({ classes, value, ...rest }) => {
    return (
        <Card elevation={0} className={classes.root}>
            {renderControl(value, rest)}
        </Card>
    );
};

const styles = {
    root: {
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "stretch",
        "&>*": {
            flex: "1 0 auto",
        }
    },
};

export default withStyles(styles)(
    Control
);
