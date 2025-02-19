import { Grid2 as Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutDialog from '../dialogs/LogoutDialog';
function TopNav() {
    const logo = `${process.env.PUBLIC_URL}/assets/template-logo.png`;
    const email = localStorage.getItem('email');
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Grid
                sx={{
                    padding: '12px',
                    borderBottom: '1px solid hsl(215, 15%, 92%)',
                }}
                container
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Link to="/">
                    <img alt="logo" src={logo} height={30} />
                </Link>
                <Typography
                    variant="body2"
                    color="primary"
                    sx={{ cursor: 'pointer' }}
                    onClick={handleOpen}
                >
                    {email}
                </Typography>
            </Grid>
            <LogoutDialog open={open} handleClose={handleClose} />
        </>
    );
}

export default TopNav;
