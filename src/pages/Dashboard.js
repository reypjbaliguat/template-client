import { Button, Grid2 as Grid } from '@mui/material';
import React from 'react';
import TopNav from '../components/layouts/TopNav';

function Dashboard() {
    const handleSignOut = () => {
        localStorage.removeItem('token'); // Remove token
        window.location.href = '/login'; // Redirect to login page
    };
    return (
        <Grid container flexDirection={'column'}>
            <TopNav />
            <Button onClick={() => handleSignOut()}> Logout </Button>
        </Grid>
    );
}

export default Dashboard;
