import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import * as ValueType from "../../geometry/renderHints/ValueTypes";
import Slider from '../generic/controls/Slider/Slider';

const Control = ({ classes, value, ...rest }) => {
    return (
        <Card elevation={0} className={classes.root}>
            {value.type === ValueType.RANGE &&
                <Slider {...value} {...rest} />
            }
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
