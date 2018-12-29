import React from 'react'
import { Typography } from '@material-ui/core';

export default function H2({ children, align = "center", ...rest }) {
    return (
        <Typography color="inherit" align={align} variant="h2" {...rest}>
            {children}
        </Typography>
    )
}
