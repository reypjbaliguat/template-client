import { Grid2 as Grid } from '@mui/material';
import React from 'react';

function TemplateContainer({ children }) {
    return (
        <Grid container spacing={2} p={4}>
            {children}
        </Grid>
    );
}

export default TemplateContainer;
