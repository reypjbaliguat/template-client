import { Box, Grid2 as Grid } from '@mui/material';
import React from 'react';
import TopNav from '../components/layouts/TopNav';
import TemplateContainer from '../components/template/TemplateContainer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Template from '../components/template/Template';

function Dashboard() {
    const handleAddTemplate = () => {
        alert('added');
    };
    return (
        <Grid container flexDirection={'column'}>
            <TopNav />
            <TemplateContainer>
                <Template />
                <Template />
                <Box
                    sx={{
                        width: 250,
                        height: 300,
                        border: '1px solid hsl(215, 15%, 92%)',
                        borderRadius: 4,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        transition: 'all .5s',
                        ':hover': {
                            boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
                        },
                    }}
                    onClick={handleAddTemplate}
                >
                    <AddCircleOutlineIcon color="primary" fontSize="large" />
                </Box>
            </TemplateContainer>
        </Grid>
    );
}

export default Dashboard;
