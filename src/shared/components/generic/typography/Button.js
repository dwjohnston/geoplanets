import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
const MyButton = ({ classes, children, ...rest }) => {
    return (
        <Button className={classes.root} {...rest}>
            {children}
        </Button>
    );
};

const styles = {
    root: {},
};

export default withStyles(styles)(
    MyButton
);
