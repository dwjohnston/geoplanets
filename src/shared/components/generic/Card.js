import React from 'react'
import { Card } from '@material-ui/core';

export default function MyCard({ children, ...rest }) {
    return (
        <Card {...rest} >
            {children}
        </Card>
    )
}
