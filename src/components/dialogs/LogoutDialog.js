import { Box, Button, Dialog, DialogContent } from '@mui/material';

function LogoutDialog({ open, handleClose }) {
    const handleSignOut = () => {
        localStorage.removeItem('token'); // Remove token
        localStorage.removeItem('email'); // Remove email
        window.location.href = '/login'; // Redirect to login page
    };
    return (
        <Dialog onClose={handleClose} open={open} sx={{ padding: 4 }}>
            <DialogContent>
                <Box
                    sx={{
                        minWidth: 150,
                        height: 50,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSignOut}
                    >
                        {' '}
                        Logout{' '}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default LogoutDialog;
