import React from 'react'
import { Typography } from '@material-ui/core';

export default function H3({ children, align = "center", ...rest }) {
    return (
        <Typography color="inherit" align={align} variant="h3" {...rest}>
            {children}
        </Typography>
    )
}
