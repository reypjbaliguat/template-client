import React from 'react';
import { Box, Typography } from '@mui/material';

function AuthContainer({ children, headerText }) {
    const logo = `${process.env.PUBLIC_URL}/assets/template-logo.png`;
    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                flexDirection: 'column',
            }}
        >
            <img alt="logo" src={logo} height={100} />
            <Box
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: '#ffffff',
                    maxWidth: { xs: 270, sm: 400 },
                    width: '100%',
                    marginTop: 4,
                }}
            >
                <Typography variant="h5" gutterBottom>
                    {headerText}
                </Typography>
                {children}
            </Box>
        </Box>
    );
}

export default AuthContainer;
