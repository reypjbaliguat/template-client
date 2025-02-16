import { Grid2 as Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function TopNav() {
    const logo = `${process.env.PUBLIC_URL}/assets/template-logo.png`;
    return (
        <Grid sx={{ padding: '12px' }} container>
            <Link to="/">
                <img alt="logo" src={logo} height={30} />
            </Link>
        </Grid>
    );
}

export default TopNav;
