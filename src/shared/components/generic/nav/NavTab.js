import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { Tab } from '@material-ui/core';
const NavTab = ({ classes, label, to, value, ...rest }) => {
    return (
        <Tab
            label={label}
            component={Link}
            to={to}
            value={value}
            {...rest}
        />
    );
};

const styles = {
    root: {},
};

export default withStyles(styles)(
    NavTab
);
