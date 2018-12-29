import React from 'react'
import PropTypes from 'prop-types'
import Typography from "@material-ui/core/Typography";
function H1({ children, align = "center", ...rest }) {
    return (
        <Typography variant="h1" align={align} color="inherit" {...rest} >
            {children}
        </Typography>
    )
}

H1.propTypes = {
    children: PropTypes.node.isRequired,
}

export default H1

