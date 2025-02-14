import { Button, Grid2 } from '@mui/material';
import React from 'react';

function Dashboard() {
    const handleSignOut = () => {
        localStorage.removeItem('token'); // Remove token
        window.location.href = '/login'; // Redirect to login page
    };
    return (
        <Grid2>
            <Button onClick={() => handleSignOut()}> Logout </Button>
        </Grid2>
    );
}

export default Dashboard;
