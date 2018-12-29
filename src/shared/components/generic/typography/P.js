import React from 'react'
import { Typography } from '@material-ui/core';

export default function P({ children, noGutter, ...rest }) {
    return (
        <Typography color="inherit"  {...rest} gutterBottom={!noGutter}>
            {children}
        </Typography>
    )
}
