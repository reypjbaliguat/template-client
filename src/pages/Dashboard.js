import { Grid2 as Grid } from '@mui/material';
import React from 'react';
import TopNav from '../components/layouts/TopNav';

function Dashboard() {
    return (
        <Grid container flexDirection={'column'}>
            <TopNav />
        </Grid>
    );
}

export default Dashboard;
